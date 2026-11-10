import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Like } from "./Like";

export function initAssociations() {
  User.hasMany(Post, { foreignKey: "user_id", as: "posts" });
  User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
  User.hasMany(Like, { foreignKey: "author", as: "likes" });

  Post.belongsTo(User, { foreignKey: "user_id", as: "user" });
  Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
  Post.hasMany(Like, { foreignKey: "post_id", as: "likes" });

  Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
  Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

  Like.belongsTo(User, { foreignKey: "author", as: "user" });
  Like.belongsTo(Post, { foreignKey: "post_id", as: "post" });
}