-- Migration: 004 - Restructure Organization Tables
-- Description: Create positions table, change members-division relation to one-to-many,
--              update position constraints

USE hmif_itats;

-- Create positions table
CREATE TABLE IF NOT EXISTS positions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  level TINYINT NOT NULL COMMENT 'Hierarchy level: 1=Highest, 2=Middle, 3=Lower',
  can_be_empty BOOLEAN DEFAULT FALSE COMMENT 'Whether this position can be vacant',
  division_id INT COMMENT 'NULL for organization-wide positions, specific division ID for division positions',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE,
  INDEX idx_level (level),
  INDEX idx_division_id (division_id),
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

-- Insert default positions
INSERT INTO positions (name, level, can_be_empty, division_id, sort_order) VALUES
-- Organization-wide positions (can be empty)
('Ketua Umum', 1, TRUE, NULL, 1),
('Wakil Ketua Umum', 1, TRUE, NULL, 2),
('Sekretaris Umum', 2, TRUE, NULL, 3),
('Bendahara Umum', 2, TRUE, NULL, 4),

-- Division positions (cannot be empty except for specific roles)
('Koordinator Divisi', 3, FALSE, NULL, 5),
('Anggota Divisi', 3, FALSE, NULL, 6);

-- Modify members table to use position_id
ALTER TABLE members
  ADD COLUMN position_id INT AFTER name,
  ADD FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE SET NULL,
  DROP COLUMN position,
  DROP COLUMN level,
  DROP COLUMN department,
  ADD INDEX idx_position_id (position_id);

-- Modify division_members table to enforce one member per division
ALTER TABLE division_members
  DROP INDEX unique_division_member,
  ADD UNIQUE KEY unique_member (member_id),
  ADD COLUMN is_coordinator BOOLEAN DEFAULT FALSE AFTER role;

-- Update division_members to set is_coordinator based on old role (BEFORE dropping role column)
UPDATE division_members SET is_coordinator = TRUE WHERE role = 'coordinator';

-- Now drop the role column
ALTER TABLE division_members DROP COLUMN role;

-- Update existing members to have position_id (set to 'Anggota Divisi' as default)
UPDATE members SET position_id = (SELECT id FROM positions WHERE name = 'Anggota Divisi' LIMIT 1);

-- Add check constraint to ensure positions that cannot be empty are filled
-- This will be enforced by application logic since MySQL doesn't support CHECK constraints reliably

-- Update the schema version or add migration tracking if needed
-- (This is a simple migration, so we'll rely on the file naming)
