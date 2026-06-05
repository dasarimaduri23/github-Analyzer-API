const express = require("express");

const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
} = require("../controllers/githubController");

const router = express.Router();

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getProfileByUsername);

module.exports = router;