const { Response, sequelize } = require("../models");
const { STORAGE_FAMILY } = require("../config/storage");
const path = require("path");

async function fetchByKeys(req, res) {
  try {
    const value = await Response.findOne({
      where: {
        register_code: req.params.r_code,
        activity_code: req.params.a_code,
      },
    });

    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function store(req, res) {
  try {
    const file = req.files.file;
    const data = JSON.parse(req.body.data);

    const r = await Response.create({
      register_code: data.register_code,
      activity_code: data.activity_code,
      attached: `file_${data.activity_code}${path.extname(file.name)}`,
    });

    file.mv(`${STORAGE_FAMILY}${r.register_code}/${r.attached}`, (err) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: "Archivo guardado" });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function update(req, res) {
  try {
    await sequelize.transaction(function (t) {
      return Response.findOrCreate({
        where: {
          register_code: req.params.r_code,
          activity_code: req.params.a_code,
        },
        transaction: t,
      }).spread(function (resResult, created) {
        resResult.score = req.body.score;
        resResult.obs = req.body.obs;
        resResult.save({ fields: ["score", "obs"] });
        return res.status(200).json({ message: "Correctamente Actualizado" });
      });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function downloadAttached(req, res) {
  try {
    const value = await Response.findOne({
      where: {
        register_code: req.params.r_code,
        activity_code: req.params.a_code,
      },
    });
    if (value.attached === null) {
      throw new Error("No se encontro respuesta");
    }
    res.download(`${STORAGE_FAMILY}${value.register_code}/${value.attached}`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByKeys,
  store,
  downloadAttached,
  update,
};
