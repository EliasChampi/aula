const { Router } = require("express");
const router = Router();
const { verifyToken, year } = require("../middlewares");
// controllers
const auth = require("../controllers/auth");
const op = require("../controllers/operativeTeacher");
const reg = require("../controllers/register");
const section = require("../controllers/section");
const unit = require("../controllers/unit");
const activity = require("../controllers/activity");
const stu = require("../controllers/student");
const res = require("../controllers/response");

// auth
router.post("/auth/signin", auth.signin);
router.put("/auth/update", auth.updatePassword);
router.put("/auth/recover", auth.recoverPassword);

// student
router.get("/stus_by_family/:dni", verifyToken, stu.fetchByFamily);
router.get("/stu_by_code/:r_code", verifyToken, stu.fetchByCode);

//register
router.get("/regs_by_stu/:dni", verifyToken, reg.fetchByStudent);
router.get("/regs_by_section/:s_code", verifyToken, reg.fetchBySection);
router.get("/regs_res/:s_code/:a_code", verifyToken, reg.fetchBySecWithRes);

// section
router.get("/section/:code", verifyToken, section.fetchByCodeWithRelations);
// unit
router.get("/units/:op_code", verifyToken, unit.fetchByOperative);
router.get("/unit/:code", verifyToken, unit.fetchByCode);
router.post("/unit", verifyToken, unit.store);
router.put("/unit/:code", verifyToken, unit.update);
router.get("/ops/:code", verifyToken, unit.fetchOperatives);

// operatives
router.get("/ops_s/:s_code", verifyToken, op.fetchBySecction);
// activity
router.get("/activities/t/:u_code", verifyToken, activity.fetchByUnit);
router.get("/activities/:s_code", verifyToken, year, activity.fetchBySec);
router.get(
  "/activities/f/:r_code/:s_code",
  verifyToken,
  activity.fetchByRegWithRes
);
router.get("/activity/:s_code/:code", verifyToken, activity.fetchByCode);
router.get("/activity_d/:code", verifyToken, activity.downloadAttached);
router.post("/activity", verifyToken, activity.store);
router.put("/activity/:code", verifyToken, activity.update);
// response
router.get("/response/:r_code/:a_code", verifyToken, res.fetchByKeys);
router.get("/response/d/:r_code/:a_code", verifyToken, res.downloadAttached);
router.post("/response", verifyToken, res.store);
router.put("/response/:r_code/:a_code", verifyToken, res.update);
module.exports = router;
