const fs = require('fs');
const path = require('path');

// Load SQL from a file (synchronous)
const loadSQL = (filename) => {
  const filePath = path.join(__dirname, filename); // Get absolute path to the SQL file
  return fs.readFileSync(filePath, 'utf-8'); // Read SQL file contents as string
}; 

// Export SQL commands
module.exports = {
  createTables: loadSQL('./CreateTables.sql'), // Path to your 'CreateTables.sql' file
};