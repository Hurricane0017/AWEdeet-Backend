require('dotenv').config(); // Load environment variables

const express = require("express");
const router = require("./routes/router"); // Import router for API routes
const connectToDatabase = require("./Database/DB.js"); // Import database connection
const queries = require('./Database/Queries'); // Import database queries

const app = express();
 
// Middleware
app.use(express.json()); // Enable JSON parsing for incoming requests

// Port setup
const port = process.env.PORT || 5000;

// Setup database tables (async function)
const setupDatabase = async (pool) => {
  try {
    await pool.query(queries.createTables); // Execute the SQL query to create tables
    console.log("Database tables created successfully!");
  } catch (err) {
    console.error("Error creating database tables:", err.message);
    throw err; // Throw error so it can be handled by the caller
  }
};

// Start server after database setup (async function)
const startServer = async () => {
  try {
    const pool = await connectToDatabase(); // Initialize database connection (await the async call)

    await setupDatabase(pool); // Ensure tables are created before starting the server

    // Pass the database pool to the router for handling API requests
    const routes = router(pool); // Pass the pool object to the router
    app.use("/", routes); // Mount the router at '/api' path

    // Start the server on the configured port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process if server setup fails
  }
};

// Start the application
startServer();