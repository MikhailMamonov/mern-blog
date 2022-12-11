const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Post = sequelize.define('post', {
  username: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING(8000), allowNull: false },
  text: { type: DataTypes.STRING(8000), allowNull: false },
  imgUrl: { type: DataTypes.STRING, defaultValue: '' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Comment = sequelize.define('comment', {
  comment: { type: DataTypes.STRING(8000), allowNull: false },
});

User.hasMany(Post, { foreignKey: 'author' });
Post.belongsTo(User, { foreignKey: 'author' });

User.hasMany(Comment, { foreignKey: 'author' });
Comment.belongsTo(User, { foreignKey: 'author' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = {
  User,
  Post,
  Comment,
};
