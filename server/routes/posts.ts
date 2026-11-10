import checkAuth from "../middlewares/auth.middleware";
import express from "express";
// Импортируем как именованный экспорт (не default)
import { PostController } from "./../controllers/posts.controller";

const router = express.Router();

// СОЗДАЕМ ЭКЗЕМПЛЯР контроллера
const postController = new PostController();

// Используем .bind() для сохранения контекста this
router.post("/", checkAuth, postController.createPost.bind(postController));
router.get("/", postController.getAll.bind(postController));
router.get("/:id", postController.getById.bind(postController));
router.get("/user/me", checkAuth, postController.getMyPosts.bind(postController));
router.delete("/:id", checkAuth, postController.deleteById.bind(postController));
router.put("/:id", checkAuth, postController.updatePost.bind(postController));
router.get("/comments/:id", postController.getPostComments.bind(postController));
router.post("/like/:id", checkAuth, postController.likePost.bind(postController));

export default router;