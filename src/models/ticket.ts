import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Ticket extends Model {
  public id!: number;
  public eventId!: number;
  public orderId!: number;
  public qrCode!: string;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    qrCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "tickets",
  }
);

export default Ticket;
