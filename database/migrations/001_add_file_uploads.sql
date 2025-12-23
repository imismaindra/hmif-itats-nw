-- Migration: Add file uploads support
-- This migration adds support for file uploads by creating an uploads table
-- and updating image fields to reference uploaded files

USE hmif_itats;

-- Create uploads table to track uploaded files
CREATE TABLE IF NOT EXISTS uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  path VARCHAR(500) NOT NULL,
  url VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100),
  size INT,
  uploaded_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_uploads_filename ON uploads(filename);
CREATE INDEX idx_uploads_uploaded_by ON uploads(uploaded_by);
CREATE INDEX idx_uploads_created_at ON uploads(created_at);

-- Note: Existing image fields in posts, activities, programs, and members tables
-- already use VARCHAR(255) which is sufficient for storing file paths like '/uploads/filename.jpg'
-- No changes needed to existing image columns
