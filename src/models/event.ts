import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: string;
  public time!: string;
  public venue!: string;
  public price!: number;
  public image!: string | null;
  public ticketsAvailable!: number;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 300
},

    ticketsAvailable: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    
  },
  {
    sequelize,
    tableName: "events",
  }
);

export default Event;
