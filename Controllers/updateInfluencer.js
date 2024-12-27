const updateInfluencer = async (req, res, pool) => {
  try {
    const { id } = req.params;
    const { likes, comments, shares, Followers } = req.body;

    // Validation: Ensure all required fields are provided
    if (likes === undefined || comments === undefined || shares === undefined || Followers === undefined) {
      return res.status(400).json({
        message: "Likes, comments, shares, and followers are required fields.",
      });
    }

    // Convert to integers and validate
    const values = {
      likes: parseInt(likes, 10),
      comments: parseInt(comments, 10),
      shares: parseInt(shares, 10),
      followers: parseInt(Followers, 10),
    };

    // Validation: Check if values are valid integers and non-negative, and Followers should be greater than 0
    for (const field in values) {
      if (isNaN(values[field]) || values[field] < 0 || (field === 'followers' && values[field] <= 0)) {
        return res.status(400).json({
          message: `Invalid ${field}: must be a non-negative integer${field === 'followers' ? ' greater than 0' : ''}`,
        });
      }
    }

    // Update query without the engagement_rate calculation since it's a generated column
    const updateQuery = `
      UPDATE influencers
      SET 
        likes = $1,
        comments = $2,
        shares = $3,
        followers = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;

    // Add the ID to the values array for the update query
    const result = await pool.query(updateQuery, [
      values.likes,
      values.comments,
      values.shares,
      values.followers,
      parseInt(id, 10), // Ensure ID is an integer
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    res.status(200).json({
      message: "Influencer updated successfully",
      updatedInfluencer: result.rows[0],
    });

  } catch (error) {
    console.error("Error updating influencer:", error.message);
    
    // More specific error messages based on the error type
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update influencer profile" });
  }
};

module.exports = updateInfluencer;