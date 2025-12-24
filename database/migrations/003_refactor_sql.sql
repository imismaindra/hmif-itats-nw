-- ==========================================
-- Safe Migration Script
-- ==========================================

USE hmif_itats;

-- Backup existing data (uncomment if needed)
-- CREATE TABLE posts_backup AS SELECT * FROM posts;
-- CREATE TABLE activities_backup AS SELECT * FROM activities;
-- CREATE TABLE programs_backup AS SELECT * FROM programs;
-- CREATE TABLE members_backup AS SELECT * FROM members;

-- Step 1: Add new columns to existing tables
ALTER TABLE posts 
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) AFTER title,
  ADD COLUMN IF NOT EXISTS author_id INT AFTER author,
  ADD COLUMN IF NOT EXISTS author_name VARCHAR(100) AFTER author_id,
  ADD COLUMN IF NOT EXISTS views INT UNSIGNED DEFAULT 0 AFTER image,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP NULL AFTER is_active,
  ADD INDEX IF NOT EXISTS idx_slug (slug),
  ADD INDEX IF NOT EXISTS idx_published_at (published_at);

-- Generate slugs from existing titles
UPDATE posts 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(title, ' ', '-'), '/', '-'), '&', 'and'))
WHERE slug IS NULL OR slug = '';

-- Make slug unique by appending id if duplicates exist
UPDATE posts p1
SET slug = CONCAT(slug, '-', id)
WHERE EXISTS (
  SELECT 1 FROM (SELECT slug FROM posts) p2 
  WHERE p2.slug = p1.slug 
  GROUP BY p2.slug 
  HAVING COUNT(*) > 1
);

-- Step 2: Migrate author data
UPDATE posts p
LEFT JOIN users u ON LOWER(p.author) = LOWER(u.username)
SET p.author_id = u.id,
    p.author_name = p.author
WHERE p.author IS NOT NULL;

-- Step 3: Update activities table
ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) AFTER title,
  ADD COLUMN IF NOT EXISTS end_date DATE AFTER date,
  ADD COLUMN IF NOT EXISTS participants_count INT UNSIGNED AFTER end_date,
  ADD COLUMN IF NOT EXISTS participants_description VARCHAR(100) AFTER participants_count,
  ADD COLUMN IF NOT EXISTS detailed_description LONGTEXT AFTER description,
  ADD COLUMN IF NOT EXISTS location VARCHAR(255) AFTER status,
  ADD COLUMN IF NOT EXISTS photos JSON AFTER image,
  MODIFY COLUMN category ENUM('INTERNAL', 'SOSIAL', 'AKADEMIK', 'KOMPETISI', 'LAINNYA') NOT NULL,
  MODIFY COLUMN status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  ADD INDEX IF NOT EXISTS idx_slug (slug);

-- Migrate participants data
UPDATE activities 
SET participants_description = participants,
    participants_count = CAST(REGEXP_REPLACE(participants, '[^0-9]', '') AS UNSIGNED)
WHERE participants IS NOT NULL;

-- Step 4: Update programs table
ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) AFTER title,
  ADD COLUMN IF NOT EXISTS budget_amount DECIMAL(15,2) AFTER participants,
  ADD COLUMN IF NOT EXISTS budget_display VARCHAR(50) AFTER budget_amount,
  ADD COLUMN IF NOT EXISTS leader_id INT AFTER budget_display,
  ADD COLUMN IF NOT EXISTS leader_name VARCHAR(100) AFTER leader_id,
  ADD COLUMN IF NOT EXISTS participants_count INT UNSIGNED AFTER department,
  MODIFY COLUMN progress TINYINT UNSIGNED DEFAULT 0,
  ADD INDEX IF NOT EXISTS idx_slug (slug),
  ADD INDEX IF NOT EXISTS idx_leader_id (leader_id);

-- Migrate budget data
UPDATE programs 
SET budget_display = budget,
    budget_amount = CASE 
      WHEN budget LIKE 'Rp -%' OR budget = 'Rp -' THEN 0
      ELSE CAST(REGEXP_REPLACE(REGEXP_REPLACE(budget, '[^0-9]', ''), '^0+', '') AS DECIMAL(15,2))
    END
WHERE budget IS NOT NULL;

-- Migrate leader data
UPDATE programs pr
LEFT JOIN members m ON pr.leader = m.name
SET pr.leader_id = m.id,
    pr.leader_name = pr.leader
WHERE pr.leader IS NOT NULL;

-- Migrate participants data
UPDATE programs
SET participants_count = participants
WHERE participants IS NOT NULL;

-- Step 5: Update divisions table
ALTER TABLE divisions
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) AFTER name,
  ADD COLUMN IF NOT EXISTS gradient_from VARCHAR(50) AFTER description,
  ADD COLUMN IF NOT EXISTS gradient_to VARCHAR(50) AFTER gradient_from,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0 AFTER gradient_to,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE AFTER sort_order,
  ADD INDEX IF NOT EXISTS idx_sort_order (sort_order),
  ADD INDEX IF NOT EXISTS idx_is_active (is_active);

-- Parse color gradients from existing color field
UPDATE divisions
SET gradient_from = SUBSTRING_INDEX(SUBSTRING_INDEX(color, ' to-', 1), 'from-', -1),
    gradient_to = SUBSTRING_INDEX(color, ' to-', -1)
WHERE color IS NOT NULL AND color LIKE 'from-%';

-- Step 6: Rename/consolidate uploads table (if media table exists)
DROP TABLE IF EXISTS media;

-- Step 7: Add missing constraints (if tables exist)
ALTER TABLE posts
  ADD CONSTRAINT IF NOT EXISTS fk_posts_author 
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE programs  
  ADD CONSTRAINT IF NOT EXISTS fk_programs_leader
  FOREIGN KEY (leader_id) REFERENCES members(id) ON DELETE SET NULL;

ALTER TABLE uploads
  ADD CONSTRAINT IF NOT EXISTS fk_uploads_user
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL;

-- Step 8: Create activity_logs table for auditing
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id INT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_table_name (table_name),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;