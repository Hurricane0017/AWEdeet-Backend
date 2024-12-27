const express = require("express");
const addInfluencer = require("../Controllers/addInfluencer");
const getInfluencers = require("../Controllers/getInfluencers");
const getInfluencerById = require("../Controllers/getInfluencerById");
const updateInfluencer = require("../Controllers/updateInfluencer");
const deleteInfluencer = require("../Controllers/deleteInfluencer");

// Import controllers


const router = (pool) => {
  const apiRouter = express.Router();

  // Pass `pool` to controllers for database operations

  apiRouter.post("/influencers", (req, res) => {
    addInfluencer(req, res, pool);
  });
  
  apiRouter.get("/influencers", (req, res) => {
    getInfluencers(req, res, pool);
  });
  
  apiRouter.get("/influencers/:id", (req, res) => {
    getInfluencerById(req, res, pool);
  });
  
  apiRouter.put("/influencers/:id", (req, res) => {
    updateInfluencer(req, res, pool);
  });
  
  apiRouter.delete("/influencers/:id", (req, res) => {
    deleteInfluencer(req, res, pool);
  });

  return apiRouter;
};

module.exports = router;
