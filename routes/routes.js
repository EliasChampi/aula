const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middlewares");
// controllers
const auth = require("../controllers/auth");
const op = require("../controllers/operativeTeacher");
const reg = require("../controllers/register");
const section = require("../controllers/section");
const unit = require("../controllers/unit");
const activity = require("../controllers/activity");
const stu = require("../controllers/student");
const res = require("../controllers/response");
// routes
router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", verifyToken, op.fetchByTeacher);
router.get("/stus_by_family/:dni", verifyToken, stu.fetchByFamily);
router.get("/stu_by_code/:dni", verifyToken, stu.fetchByCode);
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
// operatives
router.get("/operatives/:code", verifyToken, unit.fetchOperatives);
// activity
router.get("/activities/d/:u_code", verifyToken, activity.fetchByUnit);
router.get("/activities/:s_code", verifyToken, activity.fetchBySec);
router.get("/activity/:code", verifyToken, activity.fetchByCodeWithUnit);
router.get("/activity_download/:code", verifyToken, activity.downloadAttached);
router.post("/activity", verifyToken, activity.store);
router.put("/activity/:code", verifyToken, activity.update);
// relation
router.get("/response/:r_code/:a_code", verifyToken, res.fetchByKeys);
router.post("/response", verifyToken, res.store);
module.exports = router;
