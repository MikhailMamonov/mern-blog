const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Post = sequelize.define('post', {
  username: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  imgUrl: { type: DataTypes.STRING, defaultValue: '' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
});

User.hasMany(Post, { foreignKey: 'author', as: 'posts' });
Post.belongsTo(User);

module.exports = {
  User,
  Post,
};
