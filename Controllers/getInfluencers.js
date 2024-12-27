const getInfluencers = async (req, res, pool) => {
  try {
    // Start a database connection
    const client = await pool.connect();
    try {
      // Query to fetch all influencers
      const query = `
        SELECT 
          id AS influencer_id,
          name, 
          instagram_handle,
          likes, 
          comments, 
          shares, 
          followers, 
          engagement_rate, 
          age_range, 
          gender, 
          created_at, 
          updated_at
        FROM INFLUENCERS
      `;
      const result = await client.query(query); // Execute the query

      // Check if any influencers are found
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No influencers found" });
      }

      // Return the list of influencers
      res.status(200).json({
        message: "Influencers retrieved successfully",
        influencers: result.rows,
      });
    } catch (error) {
      console.error("Error fetching influencers:", error.message);
      res.status(500).json({ message: "Failed to fetch influencers" });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    // Handle connection errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: "Failed to connect to the database. Please try again later."
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getInfluencers;