import { Sequelize } from "sequelize-typescript";
import { User } from "./user.model";
import { Organisation } from "./organisation.model";
import { UserOrganisation } from "./userOrganisation.model";
import * as pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.addModels([User, Organisation, UserOrganisation]);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
export { sequelize };
