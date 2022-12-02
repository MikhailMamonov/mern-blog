const { Router } = require("express");
var express = require("express");
var router = express.Router();
const authController = require("./../controllers/auth.controller");
const checkAuthMiddldware = require("./../middlewares/checkAuth");

//http://localhost:8080/api/api/auth/me
router.get("/me", checkAuthMiddldware, authController.getMe);

//http://localhost:8080/api/auth/register
router.post("/register", authController.register);

//http://localhost:8080/api/auth/login
router.post("/login", authController.login);

module.exports = router;
