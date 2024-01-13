const express = require("express");

const authController = require("../../controllers/auth");
const { validateBody } = require("../../decorators");
const { usersSchemas } = require("../../validators");
const { authorization } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(usersSchemas.registerUser), authController.register);
router.post("/login", validateBody(usersSchemas.loginUser), authController.login);
router.get("/logout", authorization, authController.logout);

router.get("/current", authorization, authController.current);

module.exports = router;
