const { Router } = require("express");
const router = Router();
const middleware = require("../middlewares");
// controllers
const auth = require("../controllers/auth");
const op = require("../controllers/operativeTeacher");
const reg = require("../controllers/register");
const section = require("../controllers/section");
const learn = require("../controllers/learnunit");
const task = require("../controllers/task");
const stu = require("../controllers/student");

// routes
router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", middleware.verifyToken, op.fetchByTeacher);
// yup!
router.get("/stus_by_family/:dni", middleware.verifyToken, stu.fetchByFamily);
router.get("/stu_by_code/:dni", middleware.verifyToken, stu.fetchByCode);
router.get("/regs_by_stu/:dni", middleware.verifyToken, reg.fetchByStudent);

router.get(
  "/regs_by_section/:section_code",
  middleware.verifyToken,
  reg.fetchBySection
);
router.get(
  "/regs_by_section_with_res/:section_code/:task_code",
  middleware.verifyToken,
  reg.fetchBySectionWithResponse
);
router.get(
  "/section/:code",
  middleware.verifyToken,
  section.fetchByCodeWithRelations
);
router.get("/learns/:op_code", middleware.verifyToken, learn.fetchByOperative);
router.get("/learn/:code", middleware.verifyToken, learn.fetchByCode);
router.post("/learns", middleware.verifyToken, learn.store);
router.put("/learns/:code", middleware.verifyToken, learn.update);
router.get(
  "/operatives/:l_code",
  middleware.verifyToken,
  learn.fetchOperatives
);
router.get("/tasks_d/:l_code", middleware.verifyToken, task.fetchByLearn);
router.get("/tasks/:s_code", middleware.verifyToken, task.fetchBySec);
router.get("/task/:code", middleware.verifyToken, task.fetchByCodeWithLearn);
router.post("/task", middleware.verifyToken, task.store);
router.put("/task/:code", middleware.verifyToken, task.update);
module.exports = router;
