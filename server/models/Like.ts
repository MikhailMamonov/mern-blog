import {
  BelongsTo,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  FindOptions,
  Model,
} from "sequelize";

import { Post } from "./Post";
import { User } from "./User";
import { sequelize } from "../db";

export class Like extends Model {
  public static associations: {
    post: BelongsTo;
    user: BelongsTo;
  };

  public id: number;
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

Like.init({}, { sequelize });

// Hooks
Like.afterFind((likes, options: FindOptions) => {
  console.log("found");
});

// associate
export const Author = Like.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export const LikedPost = Like.belongsTo(Post, {
  as: "post",
  foreignKey: "postId",
});
