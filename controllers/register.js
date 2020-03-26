const {
  Register,
  Student,
  Section,
  Degree,
  Cycle,
  Branch
} = require("../models");
const { literal } = require("sequelize");
async function fetchByFamily(req, res) {
  try {
    const values = await Register.findAll({
      include: [
        {
          model: Student,
          as: "student",
          where: {
            $and: [
              literal(`exists (
                select * from family_student where student_dni = student.dni and exists (
                  select * from families where code = family_student.family_code and dni = '${req.params.dni}'
                ))`)
            ]
          }
        },
        {
          model: Section,
          as: "section",
          include: [
            {
              model: Degree,
              as: "degree",
              include: [
                {
                  model: Cycle,
                  as: "cycle"
                }
              ]
            }
          ]
        }
      ]
    });
    return res.status(200).json({ values });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  fetchByFamily
};
