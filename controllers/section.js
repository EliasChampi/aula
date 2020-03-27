const { Section, Degree, Cycle, Branch } = require("../models");
async function fetchByCodeWithRelations(req, res) {
  try {
    const values = await Section.findOne({
      where: {
        code: req.params.code
      },
      include: [
        {
          model: Degree,
          as: "degree",
          include: [
            {
              model: Cycle,
              as: "cycle",
              include: [
                {
                  model: Branch,
                  as: "branch"
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
  fetchByCodeWithRelations
};
