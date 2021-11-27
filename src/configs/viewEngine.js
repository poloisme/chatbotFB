const express = require("express");

const viewEngineConfig = (app) => {
  app.use(express.static("./src/public"));
  app.set("layout", "./layouts/main");
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = viewEngineConfig;
