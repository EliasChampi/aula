const express = require("express");
const { json, urlencoded } = require("body-parser");
const db = require("../models");
const routes = require("../routes");
const app = express();
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 },
    createParentPath: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
//db.sequelize.sync();
// routes
routes(app);

module.exports = app;
