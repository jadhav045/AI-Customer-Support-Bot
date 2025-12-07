const express = require("express");
const router = express.Router();

const { triggerEscalation } = require("../controllers/escalation.controller");

router.post("/", triggerEscalation);

module.exports = router;
