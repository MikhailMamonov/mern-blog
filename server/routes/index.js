var express = require("express");
var router = express.Router();
const auth = require("./auth");
const post = require("./posts");

router.use("/auth", auth);
router.use("/posts", post);

module.exports = router;
