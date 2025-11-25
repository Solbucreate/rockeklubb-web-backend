import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render trenger denne
    },
  },
});

export default sequelize;
