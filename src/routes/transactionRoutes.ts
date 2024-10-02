import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Transaction } from "../entity/Transactions";

const router = Router();

// Создание категории
router.post("/transaction", async (req, res) => {
    const transactionsRepo = AppDataSource.getRepository(Transaction);
    const newTransaction = transactionsRepo.create(req.body);
    const savedTransaction = await transactionsRepo.save(newTransaction);
    res.json(savedTransaction);
});

// Получение всех категорий
router.get("/transactions", async (req, res) => {
    const transactionsRepo = AppDataSource.getRepository(Transaction);
    const transactions = await transactionsRepo.find();
    res.json(transactions);
});

export default router;
