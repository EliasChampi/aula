const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth");
module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "falta token de seguridad, vuelva a iniciar sesión"
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Token de seguridad ha expirado, vuelva a iniciar sesión"
      });
    }
    req.dni = decoded.dni;
    next();
  });
};
