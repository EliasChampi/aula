const { Router } = require("express");
const router = Router();
const middleware = require("../middlewares");
const auth = require("../controllers/auth.js");
const op = require("../controllers/operativeTeacher.js");
const reg = require("../controllers/register");
const section = require("../controllers/section");
const learn = require("../controllers/learnunit");
router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", middleware.verifyToken, op.fetchByTeacher);
router.get("/regs_by_family/:dni", middleware.verifyToken, reg.fetchByFamily);

router.get(
  "/regs_by_section/:section_code",
  middleware.verifyToken,
  reg.fetchBySection
);
router.get(
  "/section/:code",
  middleware.verifyToken,
  section.fetchByCodeWithRelations
);
router.get("/learns/:op_code", middleware.verifyToken, learn.fetchByOperative);

module.exports = router;
