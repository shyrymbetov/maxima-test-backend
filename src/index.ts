import express from "express";
import cors from "cors"; // Добавляем импорт CORS
import { AppDataSource } from "./database/data-source";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

// Включаем CORS и разрешаем запросы с вашего React-приложения
app.use(cors({
    origin: 'http://localhost:3001', // Указываем адрес клиента
    methods: 'GET,POST,PUT,DELETE',  // Разрешаем определенные методы
    credentials: true                // Включаем поддержку кук (если нужно)
}));

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.use(transactionRoutes);

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
