const express = require("express");
const cors = require("cors");
require("dotenv").config();

const complianceRoutes = require("./routes/complianceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/compliance", complianceRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RWA Compliance Guardian API Running 🚀",
  });
});

module.exports = app;