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

module.exports = {
  fetchByOperative
};
