const { Router } = require("express");
const router = Router();
const middleware = require("../middlewares");
const auth = require("../controllers/auth.js");
const op = require("../controllers/operativeTeacher.js");

router.post("/auth/signin", auth.signin);
router.get("/courses/:dni", middleware.verifyToken, op.fetchByTeacher);

module.exports = router;
