import {
  BelongsTo,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  FindOptions,
  HasMany,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
} from "sequelize";

import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";
import { sequelize } from "../db";

export class Post extends Model {
  public static associations: {
    author: BelongsTo;
    comments: HasMany;
    likes: HasMany;
  };

  public id: number;
  public username: string;
  public title: string;
  public text: string;
  public imgUrl: string;
  public views?: number;
  public createdAt: Date;
  public updatedAt: Date;

  // mixins for association (optional)
  public authorId: number;
  public author: User;
  public likes: Like[];
  public comments: Comment[];
  public getAuthor: BelongsToGetAssociationMixin<User>;
  public setAuthor: BelongsToSetAssociationMixin<User, number>;
  public createAuthor: BelongsToCreateAssociationMixin<User>;

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

Post.init(
  {
    username: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING(8000), allowNull: false },
    text: { type: DataTypes.STRING(8000), allowNull: false },
    imgUrl: { type: DataTypes.STRING, defaultValue: "" },
  },
  { sequelize }
);

// Hooks
Post.afterFind((posts, options: FindOptions) => {
  console.log("found");
});

// associate

export const Author = Post.belongsTo(User, {
  as: "author",
  foreignKey: "authorId",
});

export const Comments = Post.hasMany(Comment, {
  as: "comments",
  foreignKey: "userId",
});
export const Likes = Post.hasMany(Like, { as: "likes", foreignKey: "userId" });
