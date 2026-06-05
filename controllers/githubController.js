const Profile = require("../models/githubmodels.js");
const { fetchGithubProfile } = require("../services/githubService");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await fetchGithubProfile(username);

    const accountAgeYears =
      new Date().getFullYear() -
      new Date(profile.created_at).getFullYear();

    const profileScore =
      profile.followers +
      profile.public_repos * 5 +
      profile.public_gists * 2;

    let github_rank;

    if (profileScore > 50000) {
      github_rank = "Expert";
    } else if (profileScore > 10000) {
      github_rank = "Advanced";
    } else {
      github_rank = "Beginner";
    }

    const savedProfile =
      await Profile.findOneAndUpdate(
        { username: profile.login },

        {
          username: profile.login,
          name: profile.name,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
          public_gists: profile.public_gists,
          account_created: profile.created_at,
          profile_url: profile.html_url,
          profile_score: profileScore,
          github_rank,
          account_age_years: accountAgeYears,
        },

        {
          new: true,
          upsert: true,
        }
      );

    res.json({
      success: true,
      profile: savedProfile,
      insights: {
        profileScore,
        github_rank,
        accountAgeYears,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({
      username,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
};