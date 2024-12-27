const deleteInfluencer = async (req, res, pool) => {
  try {
    const { id } = req.params;

    // Validate ID
    const influencerId = parseInt(id, 10);
    if (isNaN(influencerId)) {
      return res.status(400).json({
        message: "Invalid influencer ID: must be a valid integer"
      });
    }

    // Delete query with returning to check if the record existed
    const deleteQuery = `
      DELETE FROM influencers
      WHERE id = $1
      RETURNING id;
    `;

    const result = await pool.query(deleteQuery, [influencerId]);

    // Check if any row was actually deleted
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Influencer not found"
      });
    }

    // Return 204 No Content as specified
    res.status(204).send();

  } catch (error) {
    console.error("Error deleting influencer:", error);

    // Handle database connection issues
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: "Failed to connect to the database. Please try again later."
      });
    }

    // General error handling
    res.status(500).json({
      message: "Failed to delete influencer profile"
    });
  }
};

module.exports = deleteInfluencer;