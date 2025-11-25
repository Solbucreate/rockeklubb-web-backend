import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;

  // Billett-system
  public capacity!: number;            // Total antall billetter som kan selges
  public ticketsAvailable!: number;    // Antall billetter som gjenstår
  public price!: number;               // Pris pr. billett

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.DATE,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ticketsAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "events",
  }
);

export default Event;
