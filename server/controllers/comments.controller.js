const { Post, User, Comment } = require('../models');
const multiparty = require('multiparty');
const { Sequelize } = require('sequelize');

exports.createComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    if (!comment) {
      return res.json({ message: 'Комментарий не может быть пустым' });
    }

    const newComment = await Comment.create({
      comment,
      post_id: postId,
      author: req.userId,
    });
    return res.json(newComment);
  } catch (error) {
    return res.json({ message: `Что-тоо пошло не так ${error}` });
  }
};
