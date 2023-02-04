import { HasMany, Model, Optional } from "sequelize";
import {
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";

import { Comment } from "./Comment";
import { DataTypes } from "sequelize";
import { Like } from "./Like";
import { Post } from "./Post";
import { sequelize } from "../db";

export class User extends Model {
  public static associations: {
    posts: HasMany;
    comments: HasMany;
    likes: HasMany;
  };

  public id: number;
  public username: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  // mixins for association (optional)
  public posts: Post[];
  public likes: Like[];
  public comments: Comment[];
  public getPosts: HasManyGetAssociationsMixin<Post>;
  public setPosts: HasManySetAssociationsMixin<Post, number>;
  public addPost: HasManyAddAssociationMixin<Post, number>;
  public addPosts: HasManyAddAssociationsMixin<Post, number>;
  public createPost: HasManyCreateAssociationMixin<Post>;
  public countPosts: HasManyCountAssociationsMixin;
  public hasPost: HasManyHasAssociationMixin<Post, number>;
  public removePost: HasManyRemoveAssociationMixin<Post, number>;
  public removePosts: HasManyRemoveAssociationsMixin<Post, number>;

  public getComments: HasManyGetAssociationsMixin<Comment>;
  public setComments: HasManySetAssociationsMixin<Comment, number>;
  public addComment: HasManyAddAssociationMixin<Comment, number>;
  public addComments: HasManyAddAssociationsMixin<Comment, number>;
  public createComment: HasManyCreateAssociationMixin<Comment>;
  public countComments: HasManyCountAssociationsMixin;
  public hasComment: HasManyHasAssociationMixin<Comment, number>;
  public removeComment: HasManyRemoveAssociationMixin<Comment, number>;
  public removePComment: HasManyRemoveAssociationsMixin<Comment, number>;

  public getLikes: HasManyGetAssociationsMixin<Like>;
  public setLikes: HasManySetAssociationsMixin<Like, number>;
  public addLike: HasManyAddAssociationMixin<Like, number>;
  public addLikes: HasManyAddAssociationsMixin<Like, number>;
  public createLikes: HasManyCreateAssociationMixin<Like>;
  public countLikes: HasManyCountAssociationsMixin;
  public hasLike: HasManyHasAssociationMixin<Like, number>;
  public removeLike: HasManyRemoveAssociationMixin<Like, number>;
  public removePLike: HasManyRemoveAssociationsMixin<Like, number>;
}

// attach all the metadata to the model
// instead of this, you could also use decorators
User.init(
  {
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  },
  { sequelize }
);

// associate
// it is important to import _after_ the model above is already exported so the circular reference works.

export const Posts = User.hasMany(Post, { as: "posts", foreignKey: "userId" });
export const Comments = User.hasMany(Comment, {
  as: "comments",
  foreignKey: "userId",
});
export const Likes = User.hasMany(Like, { as: "likes", foreignKey: "userId" });

// export class User extends Model {
//   public static associations: {
//     Posts: HasMany;
//   };

// }

// interface UserAttributes {
//   id: number;
//   username: string;
//   password: string;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// interface UserInstance
//   extends Model<UserAttributes, UserCreationAttributes>,
//     UserAttributes {
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const User = sequelize.define<UserInstance>("user", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   username: { type: DataTypes.STRING, unique: true },
//   password: { type: DataTypes.STRING },
// });

// User.hasMany(Post, { foreignKey: "userId", as: "posts" });

// User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });

// User.hasMany(Like, { foreignKey: "user_id" });
