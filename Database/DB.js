require('dotenv').config(); // Load environment variables
const { Pool } = require('pg'); // Import PostgreSQL library

// Configuration for your PostgreSQL database connection using environment variables
const config = {
  host: process.env.DB_SERVER,      // Hostname of the remote PostgreSQL server
  user: process.env.DB_USER,        // PostgreSQL username
  password: process.env.DB_PASSWORD, // PostgreSQL password
  database: process.env.DB_DATABASE, // Database name
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  ssl: process.env.DB_TRUST_CERT === 'true' ? { rejectUnauthorized: false } : false, // Enable SSL if specified
};

// Function to create a connection pool (async)
const connectToDatabase = async () => {
  try {
    const pool = new Pool(config); // Create a new connection pool
    console.log('Connected to the PostgreSQL database successfully!');
    return pool; // Return the pool object for use in the project
  } catch (error) {
    console.error('Error connecting to the PostgreSQL database:', error.message);
    throw error; // Rethrow the error to be caught elsewhere
  }
};

module.exports = connectToDatabase;