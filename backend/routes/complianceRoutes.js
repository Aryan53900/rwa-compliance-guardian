const express = require("express");
const router = express.Router();

const complianceController = require("../controllers/complianceController");

// -------------------------
// Compliance Check
// -------------------------
router.post("/check", complianceController.checkCompliance);

// -------------------------
// Blockchain Connection Test
// -------------------------
router.get("/whoami", complianceController.whoami);

// -------------------------
// Latest Attestation ID
// -------------------------
router.get("/last", complianceController.getLastId);

// -------------------------
// Fetch Attestation by ID
// -------------------------
router.get("/:id", complianceController.getAttestation);

module.exports = router;