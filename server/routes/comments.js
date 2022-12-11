var express = require('express');
const checkAuth = require('../middlewares/checkAuth');
var router = express.Router();
const commentsController = require('./../controllers/comments.controller');

//create post
//http://localhost:8080/api/comments
router.post('/', checkAuth, commentsController.createComment);

module.exports = router;
