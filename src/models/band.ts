import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Band extends Model {
  public id!: number;
  public name!: string;
  public genre!: string | null;
  public description!: string | null;
  public image!: string | null;
}

Band.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "bands",
  }
);

export default Band;
