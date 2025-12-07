const express = require("express");
const router = express.Router();

const validateQuery = require("../validators/queryValidator");
const { handleQuery } = require("../controllers/query.controller");

router.post("/", validateQuery, handleQuery);

module.exports = router;
