-- Migration: Update division_members structure to use member_id instead of duplicated data
-- This migration changes division_members to reference members table instead of storing duplicate data

USE hmif_itats;

-- Drop existing division_members table
DROP TABLE IF EXISTS division_members;

-- Recreate division_members table with proper structure
CREATE TABLE IF NOT EXISTS division_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  division_id INT NOT NULL,
  member_id INT NOT NULL,
  role ENUM('coordinator', 'member') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  UNIQUE KEY unique_division_member (division_id, member_id)
);

-- Add index for better performance
CREATE INDEX idx_division_members_division_id ON division_members(division_id);
CREATE INDEX idx_division_members_member_id ON division_members(member_id);
