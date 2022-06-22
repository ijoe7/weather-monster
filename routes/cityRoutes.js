const express = require("express");
const router = express.Router();
// const droneController = require("../controllers/droneController");
const cityController = require("../controllers/cityController");

router.post("/", cityController.createCity);
router.patch("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;