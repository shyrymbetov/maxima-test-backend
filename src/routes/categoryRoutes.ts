import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Category } from "../entity/Category";

const router = Router();

// Создание категории
router.post("/categories", async (req, res) => {
    const categoryRepo = AppDataSource.getRepository(Category);
    const newCategory = categoryRepo.create(req.body);
    const savedCategory = await categoryRepo.save(newCategory);
    res.json(savedCategory);
});

// Получение всех категорий
router.get("/categories", async (req, res) => {
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.find();
    res.json(categories);
});

export default router;
