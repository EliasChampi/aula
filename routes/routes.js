const { Router } = require("express");
const router = Router();
const middleware = require("../middlewares");
const auth = require("../controllers/auth.js");
const op = require("../controllers/operativeTeacher.js");
const reg = require("../controllers/register");
router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", middleware.verifyToken, op.fetchByTeacher);
router.get("/regs_by_family/:dni", middleware.verifyToken, reg.fetchByFamily);

module.exports = router;
