const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middlewares");
// controllers
const auth = require("../controllers/auth");
const op = require("../controllers/operativeTeacher");
const reg = require("../controllers/register");
const section = require("../controllers/section");
const learn = require("../controllers/learnunit");
const task = require("../controllers/task");
const stu = require("../controllers/student");
const Res = require("../controllers/response");
// routes
router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", verifyToken, op.fetchByTeacher);
router.get("/stus_by_family/:dni", verifyToken, stu.fetchByFamily);
router.get("/stu_by_code/:dni", verifyToken, stu.fetchByCode);
router.get("/regs_by_stu/:dni", verifyToken, reg.fetchByStudent);
router.get("/regs_by_section/:section_code", verifyToken, reg.fetchBySection);
router.get(
  "/regs_response/:section_code/:task_code",
  verifyToken,
  reg.fetchBySectionWithResponse
);
router.get("/section/:code", verifyToken, section.fetchByCodeWithRelations);
router.get("/learns/:op_code", verifyToken, learn.fetchByOperative);
router.get("/learn/:code", verifyToken, learn.fetchByCode);
router.post("/learns", verifyToken, learn.store);
router.put("/learns/:code", verifyToken, learn.update);
router.get("/operatives/:l_code", verifyToken, learn.fetchOperatives);
router.get("/tasks_d/:l_code", verifyToken, task.fetchByLearn);
router.get("/tasks/:s_code", verifyToken, task.fetchBySec);
router.get("/task/:code", verifyToken, task.fetchByCodeWithLearn);
router.get("/task_download/:code", verifyToken, task.downloadAttached);
router.post("/task", verifyToken, task.store);
router.put("/task/:code", verifyToken, task.update);
router.get("/response/:register_code/:task_code", verifyToken, Res.fetchByKeys);
module.exports = router;
