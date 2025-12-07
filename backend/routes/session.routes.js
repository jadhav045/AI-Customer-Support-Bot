const express = require("express");
const router = express.Router();

const {
  createSession,
  getSession,
} = require("../controllers/session.controller");

router.post("/create", createSession);
router.get("/:id", getSession);

module.exports = router;
