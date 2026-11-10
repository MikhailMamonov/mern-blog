import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

export class Like extends Model {
  public id!: number;
  public post_id!: number;
  public author!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public user?: any;
  public post?: any;
}

Like.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    post_id: { type: DataTypes.INTEGER, allowNull: false },
    author: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "likes",
    timestamps: true,
  }
);