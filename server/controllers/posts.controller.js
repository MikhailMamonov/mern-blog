const { Post, User, Comment } = require('../models');
const multiparty = require('multiparty');
const { Sequelize } = require('sequelize');

exports.createPost = async (req, res) => {
  let form = new multiparty.Form({
    uploadDir: 'uploads',
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) return res.json({ message: `Что-тоо пошло не так ${err}` });
      const user = await User.findByPk(req.userId);
      if (files.image) {
        const imagePath = files.image[0].path;
        const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1);
        const newPostWithImage = await Post.create({
          username: user.username,
          title: fields.title[0],
          text: fields.text[0],
          imgUrl: imageFileName,
          author: req.userId,
        });
        return res.json(newPostWithImage);
      }
      const newPostWithoutImage = await Post.create({
        username: user.username,
        title: fields.title[0],
        text: fields.text[0],
        imgUrl: '',
        author: req.userId,
      });
      res.json(newPostWithoutImage);
    } catch (error) {
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  });
};

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'ASC']],
    });

    const popularPosts = await Post.findAll({
      order: [['views', 'ASC']],
      limit: 5,
    });
    if (!posts) {
      return res.json({ message: 'Постов нет.' });
    }

    return res.json({ posts, popularPosts });
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};

exports.getById = async (req, res) => {
  try {
    const post = await Post.update(
      { views: Sequelize.literal('COALESCE(views, 0) + 1') },
      { where: { id: req.params.id } }
    ).then(() => Post.findOne({ where: { id: req.params.id }, raw: true }));
    return res.json(post);
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};

// get my posts
//http://localhost:8080/api/posts/user/me
exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{ model: Post, as: 'posts' }],
    });
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findByPk(post.id);
      })
    );
    return res.json(list);
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};

// delete by id
//http://localhost:8080/api/posts/:id
exports.deleteById = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } }).then((count) => {
      return count > 0
        ? res.json({ message: 'Пост был удален', id: req.params.id })
        : res.json({ message: 'Такого поста не существует.' });
    });
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};

// update by id
//http://localhost:8080/api/posts/:id
exports.updatePost = async (req, res) => {
  let form = new multiparty.Form({
    uploadDir: 'uploads',
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) return res.json({ message: `Что-тоо пошло не так ${err}` });
      const { title, text, id } = fields;
      const post = await Post.findByPk(id[0]);

      if (files.image) {
        const imagePath = files.image[0].path;
        const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1);

        post.imgUrl = imageFileName || '';
      }

      post.title = title[0];
      post.text = text[0];
      console.log(post.text);
      await post.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.json({ message: `Что-тоо пошло не так ${error}` });
    }
  });
};

// Get comments for post
//http://localhost:8080/api/posts/comments/:id
exports.getPostComments = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, as: 'comments' }],
    });
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findByPk(comment.id);
      })
    );
    return res.json(list);
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};
