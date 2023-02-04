import checkAuth from "../middlewares/auth.middleware";
import commentsController from "./../controllers/comments.controller";
import express from "express";

var router = express.Router();

//create post
//http://localhost:8080/api/comments
router.post("/", checkAuth, commentsController.createComment);

export default router;
