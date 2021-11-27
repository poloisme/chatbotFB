const express = require("express");
const router = express.Router();

const chatbot = require("./chatbot.route");

const initRoute = (app) => {
  router.use("/", chatbot);

  //handle error
  // router.use(errorHandle);
  return app.use("/", router);
};

module.exports = initRoute;
