import { DataSource } from "typeorm";
import dotenv from "dotenv";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Category, Product],
    migrations: [],
    subscribers: [],
});
