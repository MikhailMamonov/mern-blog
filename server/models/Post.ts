import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

export class Post extends Model {
  public id!: number;
  public title!: string;
  public text!: string;
  public imgUrl!: string;
  public views!: number;
  public user_id!: number;
  public username!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public user?: any;
  public comments?: any[];
  public likes?: any[];
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    imgUrl: { type: DataTypes.STRING, allowNull: true },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
  }
);