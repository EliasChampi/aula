const { Student } = require("../models");
const { literal } = require("sequelize");
async function fetchByFamily(req, res) {
  try {
    const values = await Student.findAll({
      where: literal(`exists (
            select * from family_student where student_dni = "Student".dni and exists (
              select * from families where code = family_student.family_code and dni = '${req.params.dni}'
            ))`),
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByFamily,
};
