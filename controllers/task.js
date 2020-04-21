const {
  Task,
  LearnUnit,
  Response,
  OperativeTeacher,
  Course,
  Teacher,
} = require("../models");
const { STORAGE_TEACHER } = require("../config/storage");
const fs = require("fs");
const path = require("path");
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
    let task = JSON.parse(req.body.data);
    const files = req.files;
    if (files !== null) {
      task.attached = fileName(files.file, task.title, task.learnunit_code);
    }
    task = await Task.create(task);
    if (files !== null) {
      saveFile(task.attached, files.file, (data) => {
        res.status(data.status).json({ message: data.message });
      });
    } else {
      return res.status(200).send({ message: "Correctamente Guardado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function update(req, res) {
  let reqtask = JSON.parse(req.body.data);

  Task.findByPk(req.params.code)
    .then((task) => {
      const previousAttached = task.attached;
      let newAttached = previousAttached;
      const files = req.files;
      if (files !== null) {
        newAttached = fileName(files.file, reqtask.title, task.learnunit_code);
      } else {
        if (typeof reqtask.hbd !== "undefined") {
          newAttached = null;
        }
      }
      task.type = reqtask.type;
      task.title = reqtask.title;
      task.content = reqtask.content;
      task.link = reqtask.link;
      task.to_date = reqtask.to_date;
      task.attached = newAttached;
      task
        .save({
          fields: ["type", "title", "content", "link", "to_date", "attached"],
        })
        .then((r) => {
          if (files !== null) {
            if (!!previousAttached) {
              removeFile(previousAttached);
              saveFile(newAttached, files.file, (data) => {
                res.status(data.status).json({ message: data.message });
              });
            } else {
              saveFile(newAttached, files.file, (data) => {
                res.status(data.status).json({ message: data.message });
              });
            }
          } else {
            if (typeof reqtask.hbd !== "undefined") {
              removeFile(previousAttached);
            }
            return res
              .status(200)
              .json({ message: "Correctamente actualizado" });
          }
        })
        .catch((error) => {
          return res.status(500).json({ message: error.message });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: error.message });
    });
}

function fileName(file, title, l_code) {
  return title.split(" ").join("") + l_code + path.extname(file.name);
}

function today() {
  const now = new Date();
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const dd = now.getDate().toString().padStart(2, "0");
  return [now.getFullYear(), mm, dd].join("-");
}

function removeFile(previousAttached) {
  if (!!previousAttached && fs.existsSync(STORAGE_TEACHER + previousAttached)) {
    fs.unlinkSync(STORAGE_TEACHER + previousAttached);
  }
}

function saveFile(newAttached, myfile, callback) {
  myfile.mv(STORAGE_TEACHER + newAttached, (err) => {
    if (err) {
      callback({ status: 500, message: err });
    }
    callback({ status: 200, message: "Archivo guardado" });
  });
}

module.exports = {
  fetchByLearn,
  fetchBySec,
  fetchByCodeWithLearn,
  store,
  update,
};
