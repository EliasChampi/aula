const { Unit, OperativeTeacher, Sequelize } = require("../models");
async function fetchByOperative(req, res) {
  try {
    const values = await Unit.findAll({
      where: Sequelize.literal(`exists ( select * from unit_operative_teacher 
        where unit_code = "Unit".code and operative_teacher_code = ${req.params.op_code}
      )`),
      order: [["created_at", "ASC"]],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchByCode(req, res) {
  try {
    const value = await Unit.findByPk(req.params.code);
    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function store(req, res) {
  Unit.create(req.body)
    .then((unit) => {
      req.body.ops.forEach((code) => {
        OperativeTeacher.findByPk(code).then((opItem) => {
          unit.addOperative(opItem).then(() => {
            return res.status(200).json({ message: "Correctamente Guardado" });
          });
        });
      });
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
}

async function update(req, res) {
  try {
    const [updated] = await Unit.update(req.body, {
      where: {
        code: req.params.code,
      },
    });
    if (updated) {
      const unit = await Unit.findByPk(req.params.code);
      unit.removeOperatives([]).then(() => {
        req.body.ops.forEach((code) => {
          OperativeTeacher.findByPk(code).then((opItem) => {
            unit.addOperative(opItem).then(() => {
              return res
                .status(200)
                .json({ message: "Correctamente Actualizado" });
            });
          });
        });
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchOperatives(req, res) {
  try {
    const unit = await Unit.findByPk(req.params.code);
    const values = await unit.getOperatives({
      attributes: ["code"],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByOperative,
  fetchByCode,
  store,
  update,
  fetchOperatives,
};
