const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Profile Analyzer API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});