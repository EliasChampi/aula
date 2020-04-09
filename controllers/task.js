const { Task, LearnUnit } = require("../models");
async function fetchByLearn(req, res) {
  try {
    const values = await Task.findAll({
      where: {
        learnunit_code: req.params.l_code,
      },
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchByCodeWithLearn(req, res) {
  try {
    const value = await Task.findOne({
      where: {
        code: req.params.code,
      },
      include: [
        {
          model: LearnUnit,
          as: "learn",
        },
      ],
    });
    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function store(req, res) {
  try {
    const task = req.body;
    await Task.create(task);
    return res.status(200).json({ message: "Correctamente Actualizado" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByLearn,
  fetchByCodeWithLearn,
  store,
};
