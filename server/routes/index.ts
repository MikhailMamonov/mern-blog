import auth from "./auth";
import comment from "./comments";
import express from "express";
import post from "./posts";

var router = express.Router();

router.use("/auth", auth);
router.use("/posts", post);
router.use("/comments", comment);

export default router;
