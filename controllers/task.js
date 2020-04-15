const {
  Task,
  LearnUnit,
  Response,
  OperativeTeacher,
  Course,
  Teacher,
} = require("../models");
const { literal } = require("sequelize");
async function fetchByLearn(req, res) {
  try {
    const values = await Task.findAll({
      where: {
        learnunit_code: req.params.l_code,
      },
      include: [
        {
          model: Response,
          as: "responses",
        },
      ],
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function today() {
  const now = new Date();
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const dd = now.getDate().toString().padStart(2, "0");
  return [now.getFullYear(), mm, dd].join("-");
}

async function fetchBySec(req, res) {
  const { s_code } = req.params;
  try {
    const values = await Task.findAll({
      where: {
        to_date: {
          $gte: today(),
        },
      },
      attributes: ["code", "type", "title", "to_date"],
      include: [
        {
          model: LearnUnit,
          attributes: ["name"],
          as: "learn",
          include: [
            {
              model: OperativeTeacher,
              attributes: ["section_code"],
              as: "Operatives",
              include: [
                {
                  model: Course,
                  attributes: ["name"],
                  as: "course",
                },
                {
                  model: Teacher,
                  attributes: ["name"],
                  as: "teacher",
                },
              ],
              where: {
                section_code: s_code,
              },
            },
          ],
        },
      ],
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
    // subir imagen
    await Task.create(task);
    return res.status(200).json({ message: "Correctamente Guardado" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function update(req, res) {
  try {
    const task = req.body;
    // cambiar imagen
    const [updated] = await Task.update(task, {
      where: {
        code: req.params.code,
      },
    });
    if (updated) {
      return res.status(200).json({ message: "Correctamente Actualizado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByLearn,
  fetchByCodeWithLearn,
  store,
  update,
  fetchBySec,
};
