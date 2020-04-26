const { Response } = require("../models");
async function fetchByKeys(req, res) {
  try {
    const value = await Response.findOne({
      where: {
        register_code: req.params.register_code,
        task_code: req.params.task_code,
      },
    });

    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function store(req, res){
  try {
    const value = await Response.create(req.body)
  } catch (error) {
    
  }
}

module.exports = {
  fetchByKeys,
};
