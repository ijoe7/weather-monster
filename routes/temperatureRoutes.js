const express = require("express");
const router = express.Router();
const temperatureController = require("../controllers/temperatureController");

router.post("/", temperatureController.postTemperature);

module.exports = router;
