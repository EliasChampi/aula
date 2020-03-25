const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.js");
module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.dni = decoded.dni;
    next();
  });
};
