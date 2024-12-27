const getInfluencerById = async (req, res, pool) => {
  try {
    // Extract influencer ID from the request parameters
    const { id } = req.params;

    // Validation: Check if the ID is provided and is a valid integer
    const influencerId = parseInt(id, 10);
    if (isNaN(influencerId)) {
      return res.status(400).json({
        message: "Invalid influencer ID: must be a valid integer",
      });
    }

    // Query to retrieve influencer data by ID
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
      WHERE id = $1;
    `;

    // Execute the query with the provided ID
    const result = await pool.query(query, [influencerId]);

    // Check if influencer data exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Influencer not found",
      });
    }

    // Return the response with the influencer profile data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving influencer by ID:", error.message);

    // Handle database connection issues
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: "Failed to connect to the database. Please try again later."
      });
    }

    // General error handling
    res.status(500).json({
      message: "Failed to retrieve influencer profile",
    });
  }
};

module.exports = getInfluencerById;