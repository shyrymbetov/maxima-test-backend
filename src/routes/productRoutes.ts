import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from "../entity/Product";

const router = Router();

// Получение всех товаров
router.get("/products", async (req, res) => {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find({ relations: ["category"] });
    res.json(products);
});

// Получение товара по id
router.get("/products/:id", async (req, res) => {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) }, relations: ["category"] });
    res.json(product);
});

// Получение preview товара
router.get("/products/:id/preview", async (req, res) => {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });
    if (product) {
        const preview = { title: product.title, photo: product.photo, sale: product.sale };
        res.json(preview);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

export default router;
