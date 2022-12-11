var express = require('express');
const checkAuth = require('../middlewares/checkAuth');
var router = express.Router();
const postController = require('./../controllers/posts.controller');

//create post
//http://localhost:8080/api/posts
router.post('/', checkAuth, postController.createPost);

//get all posts
//http://localhost:8080/api/posts
router.get('/', postController.getAll);

//get post by id
//http://localhost:8080/api/posts/:id
router.get('/:id', postController.getById);

// get my posts
//http://localhost:8080/api/posts/user/me
router.get('/user/me', checkAuth, postController.getMyPosts);

//delete post by id
//http://localhost:8080/api/posts/:id
router.delete('/:id', checkAuth, postController.deleteById);

//update post by id
//http://localhost:8080/api/posts/:id
router.put('/:id', checkAuth, postController.updatePost);

//get post by id
//http://localhost:8080/api/posts/comments/:id
router.get('/comments/:id', postController.getPostComments);
module.exports = router;
