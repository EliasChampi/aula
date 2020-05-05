const { year } = require("../config/utils");
module.exports = function (req, res, next) {
  if (req.params.s_code.substr(0, 4) !== year) {
    return res.status(403).send({
      message: "No hay resultados del año anterior",
    });
  }
  next();
};
