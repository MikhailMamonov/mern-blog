var express = require("express");
const checkAuth = require("../middlewares/checkAuth");
var router = express.Router();
const postController = require("./../controllers/posts.controller");

//http://localhost:8080/api/posts
router.post("/", checkAuth, postController.createPost);
module.exports = router;
