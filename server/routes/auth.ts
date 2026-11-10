import AuthController from "../controllers/auth.controller";
import checkAuthMiddldware from "../middlewares/auth.middleware";
import express from "express";

var router = express.Router();
const authController = new AuthController();


//http://localhost:8080/api/auth/me
router.get("/me", checkAuthMiddldware, authController.getMe.bind(authController));

//http://localhost:8080/api/auth/register
router.post("/register", authController.register.bind(authController));

//http://localhost:8080/api/auth/login
router.post("/login", authController.login.bind(authController));

export default router;
