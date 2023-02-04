import {
  BelongsTo,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  FindOptions,
  Model,
} from "sequelize";

import { Post } from "./Post";
import { User } from "./User";
import { sequelize } from "../db";

export class Comment extends Model {
  public static associations: {
    post: BelongsTo;
    user: BelongsTo;
  };

  public id: number;
  public comment: string;
  public createdAt: Date;
  public updatedAt: Date;

  // mixins for association (optional)
  public userId: number;
  public user: User;
  public getUser: BelongsToGetAssociationMixin<User>;
  public setUser: BelongsToSetAssociationMixin<User, number>;
  public createUser: BelongsToCreateAssociationMixin<User>;
  public postId: number;
  public post: Post;
  public getPost: BelongsToGetAssociationMixin<Post>;
  public setPost: BelongsToSetAssociationMixin<Post, number>;
  public createPost: BelongsToCreateAssociationMixin<Post>;
}

Comment.init(
  {
    comment: { type: DataTypes.STRING(8000), allowNull: false },
  },
  { sequelize }
);

// Hooks
Comment.afterFind((Comments, options: FindOptions) => {
  console.log("found");
});

// associate
export const Author = Comment.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export const CommentdPost = Comment.belongsTo(Post, {
  as: "post",
  foreignKey: "postId",
});

// interface CommentAttributes {
//   id: number;
//   comment: string;
//   user_id: number;
//   post_id: number;
// }

// interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

// interface CommentInstance
//   extends Model<CommentAttributes, CommentCreationAttributes>,
//     CommentAttributes {
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const Comment = sequelize.define<CommentInstance>("comment", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   comment: { type: DataTypes.STRING(8000), allowNull: false },
//   user_id: { type: DataTypes.INTEGER, allowNull: true },
//   post_id: { type: DataTypes.INTEGER, allowNull: true },
// });

// Comment.belongsTo(User, { foreignKey: "user_id" });
// Comment.belongsTo(Post, { foreignKey: "post_id" });

// export { Comment };
