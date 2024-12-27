const addInfluencer = async (req, res, pool) => {
  try {
    // Extract influencer data from the request body
    const { name, handle, likes, comments, shares, followers, age_range, gender } = req.body;

    // Validation: Ensure all required fields are provided
    if (!name || !handle || !followers || !age_range || !gender) {
      return res.status(400).json({
        message: "All fields (name, handle, followers, age_range, gender) are required.",
      });
    }

    // Validate positive integers for likes, comments, shares, and followers
    if (
      (likes !== undefined && !Number.isInteger(likes)) ||
      (comments !== undefined && !Number.isInteger(comments)) ||
      (shares !== undefined && !Number.isInteger(shares)) ||
      !Number.isInteger(followers) || followers <= 0
    ) {
      return res.status(400).json({
        message: "Likes, comments, shares, and followers must be valid positive integers.",
      });
    }

    // Validate age_range (should be one of the predefined values)
    const validAgeRanges = ['18-24', '25-34', '35-44', '45+'];
    if (!validAgeRanges.includes(age_range)) {
      return res.status(400).json({
        message: "Invalid age range. Valid values are '18-24', '25-34', '35-44', or '45+'.",
      });
    }

    // Validate gender (should be one of the predefined values)
    const validGenders = ['Male', 'Female', 'Other'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        message: "Invalid gender. Valid values are 'Male', 'Female', or 'Other'.",
      });
    }

    // Validate Instagram handle uniqueness
    const handleCheckQuery = `SELECT * FROM influencers WHERE instagram_handle = $1;`;
    const handleCheckResult = await pool.query(handleCheckQuery, [handle]);

    if (handleCheckResult.rows.length > 0) {
      return res.status(400).json({
        message: "Instagram handle must be unique.",
      });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN'); // Start transaction

      // Insert the new influencer into the database
      const insertQuery = `
        INSERT INTO influencers (name, instagram_handle, likes, comments, shares, followers, age_range, gender)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const insertValues = [
        name,
        handle,
        likes || 0,
        comments || 0,
        shares || 0,
        followers,
        age_range,
        gender,
      ];
      const insertResult = await client.query(insertQuery, insertValues);

      await client.query('COMMIT'); // Commit the transaction

      // Return the response with the newly added influencer
      res.status(201).json({
        message: "Influencer added successfully",
        newInfluencer: insertResult.rows[0],
      });
    } catch (error) {
      await client.query('ROLLBACK'); // Rollback the transaction on error
      console.error("Transaction error:", error.message);
      res.status(500).json({ message: "Failed to add influencer" });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error adding influencer:", error.message);
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: "Failed to connect to the database. Please try again later.",
      });
    }
    res.status(500).json({
      message: "Internal server error while adding influencer.",
    });
  }
};

module.exports = addInfluencer;