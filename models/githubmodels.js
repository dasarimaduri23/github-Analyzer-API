const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    name: String,

    followers: Number,

    following: Number,

    public_repos: Number,

    public_gists: Number,

    account_created: Date,

    profile_url: String,

    profile_score: Number,

    github_rank: String,

    account_age_years: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);