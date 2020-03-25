const express = require("express");
const { json, urlencoded } = require("body-parser");
const { join } = require("path");
const db = require("../models");
const routes = require("../routes");
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
db.sequelize.sync();
// routes
routes(app);

app.use(express.static(join(__dirname, "client/build")));
app.get("*", function(req, res) {
  res.sendFile(join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
