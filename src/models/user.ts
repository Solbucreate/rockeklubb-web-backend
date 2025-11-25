import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
