const mysql = require('mysql2/promise');
const fs = require('fs');

async function setupDatabase() {
  let connection;

  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS hmif_itats');
    console.log('Database created');

    // Switch to database by creating new connection
    await connection.end();
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: 'hmif_itats',
    });

    // Read and execute schema
    const schema = fs.readFileSync('./database/schema.sql', 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    console.log('Schema created');

    // Read and execute seed data
    const seedData = fs.readFileSync('./database/seed.sql', 'utf8');
    const seedStatements = seedData.split(';').filter(stmt => stmt.trim());

    for (const statement of seedStatements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    console.log('Seed data inserted');

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
