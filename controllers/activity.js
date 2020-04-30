const {
  Activity,
  Unit,
  Response,
  OperativeTeacher,
  Course,
  Teacher,
} = require("../models");
const { STORAGE_TEACHER } = require("../config/storage");
const fs = require("fs");
const path = require("path");

async function fetchByUnit(req, res) {
  try {
    const values = await Activity.findAll({
      where: {
        unit_code: req.params.u_code,
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
    const values = await Activity.findAll({
      where: {
        to_date: {
          $gte: today(),
        },
      },
      attributes: ["code", "type", "title", "to_date"],
      include: [
        {
          model: Unit,
          attributes: ["name"],
          as: "unit",
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

async function fetchByCodeWithUnit(req, res) {
  try {
    const value = await Activity.findOne({
      where: {
        code: req.params.code,
      },
      include: [
        {
          model: Unit,
          as: "unit",
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
    let activity = JSON.parse(req.body.data);
    const files = req.files;
    if (files !== null) {
      activity.attached = fileName(
        files.file,
        activity.title,
        activity.unit_code
      );
    }
    activity = await Activity.create(activity);
    if (files !== null) {
      saveFile(activity.attached, files.file, (data) => {
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
  let reqActivity = JSON.parse(req.body.data);

  Activity.findByPk(req.params.code)
    .then((activity) => {
      const previousAttached = activity.attached;
      let newAttached = previousAttached;
      const files = req.files;
      if (files !== null) {
        newAttached = fileName(
          files.file,
          reqActivity.title,
          activity.unit_code
        );
      } else {
        if (typeof reqActivity.hbd !== "undefined") {
          newAttached = null;
        }
      }
      activity.type = reqActivity.type;
      activity.title = reqActivity.title;
      activity.content = reqActivity.content;
      activity.videoid = reqActivity.videoid;
      activity.to_date = reqActivity.to_date;
      activity.attached = newAttached;
      activity
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
            if (typeof reqActivity.hbd !== "undefined") {
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
      return res.status(500).json({ message: error.message });
    });
}

async function downloadAttached(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.code);
    if (!!activity.attached) {
      const date = new Date(activity.to_date);
      const newPath = `storage/teacher/${date.getFullYear()}/${
        date.getMonth() + 1
      }`;
      res.download(path.join(newPath, activity.attached));
    } else {
      throw new Error("no hay adjunto");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function fileName(file, title, u_code) {
  return title.split(" ").join("") + u_code + path.extname(file.name);
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
  fetchByUnit,
  fetchBySec,
  fetchByCodeWithUnit,
  downloadAttached,
  store,
  update,
};
