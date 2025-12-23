const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function updateAdminUser() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: 'hmif_itats',
    });

    console.log('Connected to database');

    // Update admin user to include member_id
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await connection.query(
      'UPDATE users SET password_hash = ?, member_id = ? WHERE username = ?',
      [hashedPassword, 1, 'admin']
    );

    console.log('Admin user updated successfully');
  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

updateAdminUser();
