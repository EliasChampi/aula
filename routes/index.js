const cors = require("cors");
const router = require("./routes.js");
module.exports = function (app) {
  app.use(
    cors({
      origin: process.env.CLIURL,
    })
  );
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api", router);
};
