import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Order extends Model {
  public id!: number;
  public eventId!: number;
  public email!: string;
  public quantity!: number;
  public totalPrice!: number;
  public paymentStatus!: string;
}

Order.init(
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

export default Order;
