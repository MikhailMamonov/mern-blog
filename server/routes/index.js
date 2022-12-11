var express = require('express');
var router = express.Router();
const auth = require('./auth');
const post = require('./posts');
const comment = require('./comments');

router.use('/auth', auth);
router.use('/posts', post);
router.use('/comments', comment);

module.exports = router;
