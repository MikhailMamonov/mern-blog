import authController from "../controllers/auth.controller";
import checkAuthMiddldware from "../middlewares/auth.middleware";
import express from "express";

var router = express.Router();

//http://localhost:8080/api/auth/me
router.get("/me", checkAuthMiddldware, authController.getMe);

//http://localhost:8080/api/auth/register
router.post("/register", authController.register);

//http://localhost:8080/api/auth/login
router.post("/login", authController.login);

export default router;
