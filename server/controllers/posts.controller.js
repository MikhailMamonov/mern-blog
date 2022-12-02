const { Post, User } = require("../models");
const dirname = require("path");
const { fileURLToPath } = require("url");

class PostsController {
  async createPost(req, res) {
    try {
      console.log(req.body);
      const { title, text } = req.body;
      const user = await User.findByPk(req.userId);
      if (req.files) {
        let fileName = Date.now() + req.files.image.name;
        req.files.image.mv(path.resolve(__dirname, "..", "uploads", fileName));
        const newPostWithImage = await Post.create({
          username: user.username,
          title,
          text,
          imgUrl: fileName,
          author: req.userId,
        });
        return res.json(newPostWithImage);
      }

      const newPostWithoutImage = await Post.create({
        username: user.username,
        title,
        text,
        imgUrl: "",
        author: req.userId,
      });

      res.json(newPostWithoutImage);
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  }
}

module.exports = new PostsController();
