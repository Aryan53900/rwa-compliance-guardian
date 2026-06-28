const express = require("express");
const router = express.Router();

const complianceController = require("../controllers/complianceController");

router.post("/check", complianceController.checkCompliance);

module.exports = router;