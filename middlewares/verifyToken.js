const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth");
module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Token de autenticación requerido"
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No estas autorizado"
      });
    }
    req.dni = decoded.dni;
    next();
  });
};
