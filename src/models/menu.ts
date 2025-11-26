import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Menu extends Model {
  public id!: number;
  public title!: string;
  public url!: string;
  public order!: number;
  public visible!: boolean;
}

Menu.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    sequelize,
    tableName: "menu",
  }
);

export default Menu;
