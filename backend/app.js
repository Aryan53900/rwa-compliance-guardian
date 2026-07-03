const express = require("express");
const cors = require("cors");
require("dotenv").config();

const complianceRoutes = require("./routes/complianceRoutes");
//const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "RWA Compliance Guardian API Running 🚀"
    });
});

module.exports = app;