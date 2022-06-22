const express = require("express");
const router = express.Router();
const forecastController = require("../controllers/forecastController");

router.get("/:id", forecastController.getForecast);

module.exports = router;
