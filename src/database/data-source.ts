import { DataSource } from "typeorm";
import dotenv from "dotenv";
import {Transaction} from "../entity/Transactions";

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
    entities: [Transaction],
    migrations: [],
    subscribers: [],
});
