const { LearnUnit } = require("../models");

async function fetchByOperative(req, res) {
  try {
    const values = await LearnUnit.findAll({
      where: {
        operative_teacher_code: req.params.op_code
      }
    });

    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function store(req, res) {
  try {
    const data = await LearnUnit.create(req.body);
    return res.status(200).json({ message: "Correctamente Guardado", data });
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
      return res.status(200).json({ message: "Correctamente Actualizado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByOperative,
  store,
  update
};
