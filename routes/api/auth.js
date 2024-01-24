const express = require("express");

const authController = require("../../controllers/auth");
const { validateBody } = require("../../decorators");
const { usersSchemas } = require("../../validators");
const { authorization, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(usersSchemas.registerUser), authController.register);
router.post("/login", validateBody(usersSchemas.loginUser), authController.login);
router.get("/logout", authorization, authController.logout);
router.get("/verify/:verificationToken", authController.verify);
router.post("/verify", validateBody(usersSchemas.emailSchema), authController.resend);

router.get("/current", authorization, authController.current);
router.patch("/avatar", upload.single("avatar"), authorization, authController.updateAvatar);

module.exports = router;
