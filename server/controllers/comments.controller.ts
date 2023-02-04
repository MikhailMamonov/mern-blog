import { Response, Router } from "express";

import { Comment } from "../models";
import { CommentCreateModel } from "./../dtos/comments/CommentCreateModel";
import { CommentViewModel } from "../dtos/comments/CommentViewModel";
import Controller from "../interfaces/controller.interface";
import { InfoViewModel } from "../dtos/InfoViewModel";
import { RequestWithBody } from "../@types";

class CommentController implements Controller {
  public path = "/comments";
  public router = Router();
  async createComment(
    req: RequestWithBody<CommentCreateModel>,
    res: Response<CommentViewModel | InfoViewModel>
  ) {
    try {
      const { comment, postId } = req.body;
      if (!comment) {
        return res.json({ message: "Комментарий не может быть пустым" });
      }

      const newComment = await Comment.create({
        comment,
        postId: postId,
        userId: req.userId,
      });
      return res.json({
        comment: newComment.comment,
        postId: newComment.postId,
        userId: newComment.userId,
      });
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  }
}

export default CommentController;
