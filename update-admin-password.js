const mysql = require('mysql2/promise');

async function updateAdminPassword() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'hmif_itats',
    });

    // New hash for 'admin123' generated with bcryptjs, cost factor 12
    const newHash = '$2b$12$Blewhbkxjltl3hS55UbyG..Y7ZXCxKuNTt0dcVjxzgnFnt08errOO';

    await connection.query(
      'UPDATE users SET password_hash = ? WHERE username = ?',
      [newHash, 'admin']
    );

    console.log('Admin password updated successfully!');
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

updateAdminPassword();
