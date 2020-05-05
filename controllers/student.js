const { Student, Sequelize } = require("../models");
async function fetchByFamily(req, res) {
  try {
    const values = await Student.findAll({
      where: Sequelize.literal(`exists (
        select * from family_student where student_dni = "Student".dni and exists (
          select * from families where code = family_student.family_code and dni = '${req.params.dni}'
        ))`),
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function fetchByCode(req, res) {
  try {
    const value = await Student.findOne({
      where: Sequelize.literal(
        `exists (select * from registers where student_dni = "Student".dni and code = '${req.params.r_code}')`
      ),
    });
    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByFamily,
  fetchByCode,
};
