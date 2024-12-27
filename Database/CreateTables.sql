-- Create enum types for age_range and gender
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'age_range_enum') THEN
        CREATE TYPE age_range_enum AS ENUM ('18-24', '25-34', '35-44', '45+');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');
    END IF;
END $$;

-- Influencers Table
CREATE TABLE IF NOT EXISTS influencers (
    id SERIAL PRIMARY KEY,                                -- Unique identifier for each influencer
    name VARCHAR(255) NOT NULL,                           -- Influencer's name
    instagram_handle VARCHAR(255) UNIQUE NOT NULL,        -- Instagram handle (unique)
    likes INT NOT NULL DEFAULT 0 CHECK (likes >= 0),      -- Engagement metric: Likes (non-negative integer)
    comments INT NOT NULL DEFAULT 0 CHECK (comments >= 0),-- Engagement metric: Comments (non-negative integer)
    shares INT NOT NULL DEFAULT 0 CHECK (shares >= 0),    -- Engagement metric: Shares (non-negative integer)
    followers INT NOT NULL DEFAULT 1 CHECK (followers >= 1), -- Total number of followers (must be >= 1)
    engagement_rate NUMERIC(5, 2) GENERATED ALWAYS AS (   -- Engagement rate calculated as ((likes + comments + shares) / followers)
        (likes + comments + shares) / NULLIF(followers, 0)
    ) STORED,
    age_range age_range_enum NOT NULL,                    -- Age range of the audience
    gender gender_enum NOT NULL,                          -- Gender of the audience
    created_at TIMESTAMP DEFAULT NOW(),                   -- Timestamp of profile creation
    updated_at TIMESTAMP DEFAULT NOW()                    -- Auto-update on changes
);