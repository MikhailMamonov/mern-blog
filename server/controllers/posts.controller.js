const { Post, User, Comment, Like } = require('../models');
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
        const newPostWithImage = await Post.create(
          {
            username: user.username,
            title: fields.title[0],
            text: fields.text[0],
            imgUrl: imageFileName,
            author: req.userId,
          },
          {
            include: [
              {
                model: Like,
                as: 'likes',
              },
              {
                model: Comment,
                as: 'comments',
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
          imgUrl: '',
          author: req.userId,
        },
        {
          include: [
            {
              model: Like,
              as: 'likes',
            },
            {
              model: Comment,
              as: 'comments',
            },
          ],
        }
      );
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
      include: [
        { model: Comment, as: 'comments' },
        { model: Like, as: 'likes' },
      ],
    });

    const popularPosts = await Post.findAll({
      order: [['views', 'ASC']],
      include: [
        { model: Comment, as: 'comments' },
        { model: Like, as: 'likes' },
      ],

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
    ).then(() =>
      Post.findOne({
        where: { id: req.params.id },
        include: [
          { model: Comment, as: 'comments' },
          { model: Like, as: 'likes' },
        ],
        raw: true,
      })
    );
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
      order: [[Post, 'createdAt', 'ASC']],
    });

    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findByPk(post.id, {
          include: [
            { model: Comment, as: 'comments' },
            { model: Like, as: 'likes' },
          ],
        });
      })
    );

    return res.json(list);
  } catch (error) {
    console.log(error);
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
      include: [
        { model: Comment, as: 'comments' },
        { model: Like, as: 'likes' },
      ],
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

// Post like for post
//http://localhost:8080/api/posts/like/:id
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: Comment, as: 'comments' },
        { model: Like, as: 'likes' },
      ],
    });
    if (post) {
      if (post.likes.find((like) => like.author === req.userId)) {
        // Post already likes, unlike it
        await Like.destroy({ where: { author: req.userId } });
      } else {
        // Not liked, like post
        await Like.create({
          post_id: req.params.id,
          author: req.userId,
        });
      }
    } else throw new UserInputError('Post not found');

    await post.reload();
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};
