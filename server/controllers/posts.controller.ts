import { Comment, Like, Post, User } from "../models";
import { Request, Response, Router } from "express";

import Controller from "../interfaces/controller.interface";
import { InfoViewModel } from "../dtos/InfoViewModel";
import { PostViewModel } from "../dtos/posts/PostViewModel";
import { RequestWithAuthorization } from "../@types";
import { Sequelize } from "sequelize";
import { UriPostIdModel } from "../dtos/posts/UriPostIdModel";
import multiparty from "multiparty";
import authMiddleware from '../middlewares/auth.middleware';
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreatePostDto } from "../dtos/posts/CreatePostDto";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();

    constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.updatePost)
      .delete(`${this.path}/:id`, this.deleteById)
      .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
  }
  
  createPost= async(req: RequestWithAuthorization, res: Response) => {
    let form = new multiparty.Form({
      uploadDir: "uploads",
    });

    form.parse(req, async function (err, fields, files) {
      try {
        if (err) return res.json({ message: `Что-тоо пошло не так ${err}` });
        const user = await User.findByPk(req.userId);
        if (!user) {
          throw new Error("Пользователь не найден.");
        }
        if (files.image) {
          const imagePath = files.image[0].path;
          const imageFileName = imagePath.slice(
            imagePath.lastIndexOf("\\") + 1
          );
          const newPostWithImage = await Post.create(
            {
              username: user.username,
              title: fields.title[0],
              text: fields.text[0],
              imgUrl: imageFileName,
              user_id: req.userId,
            },
            {
              include: [
                {
                  model: Like,
                  as: "likes",
                },
                {
                  model: Comment,
                  as: "comments",
                },
              ],
            }
          );
          await newPostWithImage.reload();
          return res.json(newPostWithImage);
        }
        const newPostWithoutImage = await Post.create(
          {
            username: user.username,
            title: fields.title[0],
            text: fields.text[0],
            imgUrl: "",
            user_id: req.userId,
          },
          {
            include: [
              {
                model: Like,
                as: "likes",
              },
              {
                model: Comment,
                as: "comments",
              },
            ],
          }
        );
        res.json(newPostWithoutImage);
      } catch (error) {
        return res.json({ message: `Что-тоо пошло не так ${error}` });
      }
    });
  }
  
  getAll =  async(req: Request, res: Response)=> {
    try {
      const posts = await Post.findAll({
        order: [["createdAt", "ASC"]],
        include: [
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],
      });

      const popularPosts = await Post.findAll({
        order: [["views", "ASC"]],
        include: [
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],

        limit: 5,
      });
      if (!posts) {
        return res.json({ message: "Постов нет." });
      }

      return res.json({ posts, popularPosts });
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  }

  getById= async(req: Request<UriPostIdModel>, res: Response) =>{
    try {
      const post = await Post.update(
        { views: Sequelize.literal("COALESCE(views, 0) + 1") },
        { where: { id: req.params.id } }
      ).then(() =>
        Post.findOne({
          where: { id: req.params.id },
          include: [
            { model: Comment, as: "comments" },
            { model: Like, as: "likes" },
          ],
          raw: true,
        })
      );
      return res.json(post);
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  }

  // get my posts
  //http
  //localhost:8080/api/posts/user/me
    public getMyPosts = async (req: RequestWithAuthorization, res: Response) => {
    try {
      const user = await User.findByPk(req.userId, {
        include: [{ model: Post, as: "posts" }],
        order: [[Post, "createdAt", "ASC"]],
      });
      
      if (user) {
        const list = await Promise.all(
          (user.posts || []).map((post: any) => {
            return Post.findByPk(post.id, {
              include: [
                { model: Comment, as: "comments" },
                { model: Like, as: "likes" },
              ],
            });
          })
        );

        return res.json(list);
      } else {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Что-то пошло не так: ${error}` });
    }
  }

  // delete by id
  //http
  //localhost:8080/api/posts/:id
  deleteById = async (
    req: RequestWithAuthorization,
    res: Response
  ) => {
    try {
      await Post.destroy({ where: { id: req.params.id } }).then((count) => {
        return count > 0
          ? res.json({ message: "Пост был удален", id: req.params.id })
          : res.json({ message: "Такого поста не существует." });
      });
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  }

  // update by id
  //http
  //localhost:8080/api/posts/:id
   updatePost = async (req: RequestWithAuthorization, res: Response) => {
    let form = new multiparty.Form({
      uploadDir: "uploads",
    });

    form.parse(req, async function (err, fields, files) {
      try {
        if (err) return res.json({ message: `Что-тоо пошло не так ${err}` });
        const { title, text, id } = fields;
        const post = await Post.findByPk(id[0]);
        if (post) {
          if (files.image) {
            const imagePath = files.image[0].path;
            const imageFileName = imagePath.slice(
              imagePath.lastIndexOf("\\") + 1
            );

            post.imgUrl = imageFileName || "";
          }

          post.title = title[0];
          post.text = text[0];
          await post.save();
          res.json(post);
        } else throw new Error("Post not found");
      } catch (error) {
        console.log(error);
        return res.json({ message: `Что-тоо пошло не так ${error}` });
      }
    });
  }

  // Get comments for post
  //http
  //localhost:8080/api/posts/comments/:id
   public getPostComments = async (
    req: RequestWithAuthorization,
    res: Response
  ) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],
      });
      
      if (post) {
        const list = await Promise.all(
          (post.comments || []).map((comment: any) => {
            return Comment.findByPk(comment.id);
          })
        );
        return res.json(list);
      } else {
        return res.status(404).json({ message: "Пост не найден" });
      }
    } catch (error) {
      return res.status(500).json({ message: `Что-то пошло не так: ${error}` });
    }
  }

  // Post like for post
  //http
  //localhost:8080/api/posts/like/:id
    public likePost = async (
    req: RequestWithAuthorization,
    res: Response<PostViewModel | InfoViewModel>
  ) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: Comment, as: "comments" },
          { model: Like, as: "likes" },
        ],
      });
      
      if (post) {
        if (post.likes?.find((like: any) => like.user?.id === req.userId)) {
          // Пост уже лайкнут, убираем лайк
          await Like.destroy({ where: { author: req.userId, post_id: post.id } });
        } else {
          // Не лайкнут, ставим лайк
          await Like.create({
            post_id: post.id,
            author: req.userId,
          });
        }
      } else {
        return res.status(404).json({ message: "Пост не найден" });
      }

      await post.reload();

      return res.json({
        id: post.id,
        username: post.username,
        title: post.title,
        text: post.text,
        imgUrl: post.imgUrl,
        views: post.views,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Что-то пошло не так: ${error}` });
    }
  }
}

export { PostController };
