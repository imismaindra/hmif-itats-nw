-- ==========================================
-- HMIF ITATS Admin System - Database Schema
-- Version: 2.0
-- ==========================================

CREATE DATABASE IF NOT EXISTS hmif_itats 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE hmif_itats;

-- ==========================================
-- Core Tables
-- ==========================================

-- Members table (HARUS DIBUAT PERTAMA - referenced by users & programs)
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  level TINYINT NOT NULL DEFAULT 3 COMMENT '1=Ketua/Wakil, 2=Sekretaris/Bendahara, 3=Koordinator/Anggota',
  image VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_position (position),
  INDEX idx_level (level),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

-- Users table (Authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
  member_id INT,
  last_login TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL,
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

-- Uploads table (File Management)
CREATE TABLE IF NOT EXISTS uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  original_name VARCHAR(255) NOT NULL,
  path VARCHAR(500) NOT NULL,
  url VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INT UNSIGNED NOT NULL COMMENT 'Size in bytes',
  category ENUM('post', 'activity', 'program', 'member', 'other') DEFAULT 'other',
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_filename (filename),
  INDEX idx_category (category),
  INDEX idx_uploaded_by (uploaded_by),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- ==========================================
-- Content Tables
-- ==========================================

-- Posts table (Pengumuman & Berita)
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE COMMENT 'URL-friendly title',
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  date DATE NOT NULL,
  author_id INT COMMENT 'Reference to users table',
  author_name VARCHAR(100) COMMENT 'Fallback if no user account',
  category ENUM('pengumuman', 'berita') NOT NULL,
  priority ENUM('tinggi', 'sedang', 'rendah') NOT NULL DEFAULT 'sedang',
  tags JSON COMMENT 'Array of tags',
  image VARCHAR(500),
  views INT UNSIGNED DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_priority (priority),
  INDEX idx_date (date),
  INDEX idx_is_active (is_active),
  INDEX idx_published_at (published_at),
  FULLTEXT INDEX ft_search (title, excerpt, content)
) ENGINE=InnoDB;

-- Activities table (Kegiatan)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category ENUM('INTERNAL', 'SOSIAL', 'AKADEMIK', 'KOMPETISI', 'LAINNYA') NOT NULL,
  date DATE NOT NULL,
  end_date DATE COMMENT 'For multi-day events',
  participants_count INT UNSIGNED COMMENT 'Number of participants',
  participants_description VARCHAR(100) COMMENT 'e.g., "14 peserta", "80 peserta"',
  description TEXT,
  detailed_description LONGTEXT,
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  location VARCHAR(255),
  image VARCHAR(500),
  photos JSON COMMENT 'Array of photo URLs',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_date (date),
  INDEX idx_status (status),
  FULLTEXT INDEX ft_search (title, description)
) ENGINE=InnoDB;

-- Programs table (Program Kerja)
CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  detailed_description LONGTEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('completed', 'ongoing', 'upcoming', 'cancelled') DEFAULT 'upcoming',
  progress TINYINT UNSIGNED DEFAULT 0 COMMENT '0-100 percentage',
  department VARCHAR(100),
  participants_count INT UNSIGNED,
  budget_amount DECIMAL(15,2) COMMENT 'Actual budget amount',
  budget_display VARCHAR(50) COMMENT 'Display string like "Rp -" or "Rp 100.000"',
  leader_id INT COMMENT 'Reference to members',
  leader_name VARCHAR(100) COMMENT 'Fallback display name',
  team JSON COMMENT 'Array of {name, role}',
  location VARCHAR(255),
  photos JSON COMMENT 'Array of photo URLs',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (leader_id) REFERENCES members(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date),
  INDEX idx_end_date (end_date),
  INDEX idx_leader_id (leader_id),
  INDEX idx_progress (progress),
  FULLTEXT INDEX ft_search (title, description),
  CONSTRAINT chk_progress CHECK (progress BETWEEN 0 AND 100),
  CONSTRAINT chk_dates CHECK (end_date >= start_date)
) ENGINE=InnoDB;

-- ==========================================
-- Organization Structure Tables
-- ==========================================

-- Divisions table (Divisi)
CREATE TABLE IF NOT EXISTS divisions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  gradient_from VARCHAR(50) COMMENT 'Tailwind color class',
  gradient_to VARCHAR(50) COMMENT 'Tailwind color class',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

-- Division members table (Anggota Divisi)
CREATE TABLE IF NOT EXISTS division_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  division_id INT NOT NULL,
  member_id INT NOT NULL,
  role ENUM('coordinator', 'member') NOT NULL DEFAULT 'member',
  joined_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  UNIQUE KEY unique_division_member (division_id, member_id),
  INDEX idx_division_id (division_id),
  INDEX idx_member_id (member_id),
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- ==========================================
-- Audit & Logging Tables
-- ==========================================

-- Activity logs table (Optional - for tracking changes)
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(50) NOT NULL COMMENT 'create, update, delete, login, etc',
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