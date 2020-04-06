const { LearnUnit, OperativeTeacher } = require("../models");
const { literal } = require("sequelize");
async function fetchByOperative(req, res) {
  try {
    const values = await LearnUnit.findAll({
      where: literal(`exists (
        select * from learnunit_operative_teacher 
        where learnunit_code = "LearnUnit".code
        and operative_teacher_code = ${req.params.op_code}
      )`)
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchByCode(req, res) {
  try {
    const value = await LearnUnit.findByPk(req.params.code);
    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function store(req, res) {
  try {
    LearnUnit.create(req.body).then(learn => {
      req.body.ops.forEach(code => {
        OperativeTeacher.findByPk(code).then(opItem => {
          learn.addOperative(opItem).then(() => {
            return res.status(200).json({ message: "Correctamente Guardado" });
          });
        });
      });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function update(req, res) {
  try {
    const [updated] = await LearnUnit.update(req.body, {
      where: {
        code: req.params.code
      }
    });
    if (updated) {
      const learn = await LearnUnit.findByPk(req.params.code);
      learn.removeOperatives([]).then(() => {
        req.body.ops.forEach(code => {
          OperativeTeacher.findByPk(code).then(opItem => {
            learn.addOperative(opItem).then(() => {
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
    const learn = await LearnUnit.findByPk(req.params.l_code);
    const values = await learn.getOperatives({
      attributes: ["code"]
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
  fetchOperatives
};
