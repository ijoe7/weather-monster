const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.get("/:id", webhookController.getWebhooksInCity);
router.post("/", webhookController.postWebhook);
router.delete("/:id", webhookController.deleteWebhook);

router.post("/demo", webhookController.demoUrl);

module.exports = router;
