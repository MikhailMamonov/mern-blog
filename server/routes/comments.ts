import checkAuth from "../middlewares/auth.middleware";
import CommentController from "./../controllers/comments.controller";
import express from "express";

const router = express.Router();

// СОЗДАЕМ ЭКЗЕМПЛЯР контроллера
const commentsController = new CommentController();

// Используем .bind() для сохранения контекста this
router.post("/", checkAuth, commentsController.createComment.bind(commentsController));

export default router;