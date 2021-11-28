const express = require("express");
const router = express.Router();

const ChatbotController = require("../controllers/chatbot.controller");

router.route("/").get(ChatbotController.getHome);

router
  .route("/webhook")
  .get(ChatbotController.getWebhook)
  .post(ChatbotController.postWebhook);

router.route("/setup-profile").post(ChatbotController.setupProfile);
module.exports = router;
