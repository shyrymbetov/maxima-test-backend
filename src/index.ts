import express from "express";
import { AppDataSource } from "./database/data-source";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.use(productRoutes);
        app.use(categoryRoutes);

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
