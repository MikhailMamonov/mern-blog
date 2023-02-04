import checkAuth from "../middlewares/auth.middleware";
import express from "express";
import postController from "./../controllers/posts.controller";

var router = express.Router();

//create post
//http://localhost:8080/api/posts
router.post("/", checkAuth, postController.createPost);

//get all posts
//http://localhost:8080/api/posts
router.get("/", postController.getAll);

//get post by id
//http://localhost:8080/api/posts/:id
router.get("/:id", postController.getById);

// get my posts
//http://localhost:8080/api/posts/user/me
router.get("/user/me", checkAuth, postController.getMyPosts);

//delete post by id
//http://localhost:8080/api/posts/:id
router.delete("/:id", checkAuth, postController.deleteById);

//update post by id
//http://localhost:8080/api/posts/:id
router.put("/:id", checkAuth, postController.updatePost);

//get post by id
//http://localhost:8080/api/posts/comments/:id
router.get("/comments/:id", postController.getPostComments);

//like post
//http://localhost:8080/api/posts/like/:id
router.post("/like/:id", checkAuth, postController.likePost);
export default router;
