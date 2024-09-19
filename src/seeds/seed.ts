// src/seeds/seed.ts

import { AppDataSource } from "../database/data-source";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

const seed = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        const categoryRepo = AppDataSource.getRepository(Category);
        const productRepo = AppDataSource.getRepository(Product);

        // Очистка существующих данных
        await productRepo.delete({});
        await categoryRepo.delete({});

        // Создание категорий
        const categoriesData = [
            { name: "Электроника", description: "Различная электроника и гаджеты" },
            { name: "Одежда", description: "Мужская и женская одежда" },
            { name: "Дом и Кухня", description: "Товары для дома и кухни" },
            { name: "Спорт", description: "Спортивные товары и оборудование" },
            { name: "Книги", description: "Различные книги и учебные материалы" },
        ];

        const categories: Category[] = [];

        for (const catData of categoriesData) {
            const category = categoryRepo.create(catData);
            await categoryRepo.save(category);
            categories.push(category);
        }

        console.log("Категории успешно созданы!");

        // Создание продуктов
        const productsData = [
            { title: "Смартфон XYZ", description: "Высококачественный смартфон с большим экраном", cost: 699, sale: 10, photo: "smartphone_xyz.jpg", category: categories[0] },
            { title: "Ноутбук ABC", description: "Мощный ноутбук для работы и игр", cost: 1299, sale: 15, photo: "laptop_abc.jpg", category: categories[0] },
            { title: "Футболка Мужская", description: "Удобная футболка из натурального хлопка", cost: 29, sale: 5, photo: "tshirt_men.jpg", category: categories[1] },
            { title: "Платье Женское", description: "Элегантное платье для особых случаев", cost: 59, sale: 20, photo: "dress_women.jpg", category: categories[1] },
            { title: "Блендер", description: "Мощный блендер для приготовления смузи", cost: 49, sale: 10, photo: "blender.jpg", category: categories[2] },
            { title: "Набор кастрюль", description: "Набор из 5 кастрюль из нержавеющей стали", cost: 99, sale: 15, photo: "pots_set.jpg", category: categories[2] },
            { title: "Фитнес-трекер", description: "Умный трекер для отслеживания активности", cost: 199, sale: 25, photo: "fitness_tracker.jpg", category: categories[3] },
            { title: "Йога-мат", description: "Комфортный йога-мат с нескользящей поверхностью", cost: 35, sale: 5, photo: "yoga_mat.jpg", category: categories[3] },
            { title: "Роман 'Война и Мир'", description: "Классический роман Льва Толстого", cost: 15, sale: 0, photo: "war_and_peace.jpg", category: categories[4] },
            { title: "Учебник по математике", description: "Подробный учебник для школьников", cost: 40, sale: 10, photo: "math_textbook.jpg", category: categories[4] },
            { title: "Телевизор 55\"", description: "4K телевизор с высоким разрешением", cost: 499, sale: 20, photo: "tv_55.jpg", category: categories[0] },
            { title: "Наушники Bluetooth", description: "Беспроводные наушники с отличным звуком", cost: 89, sale: 15, photo: "bluetooth_headphones.jpg", category: categories[0] },
            { title: "Куртка зимняя", description: "Тёплая зимняя куртка для мужчин", cost: 120, sale: 30, photo: "winter_jacket.jpg", category: categories[1] },
            { title: "Сапоги женские", description: "Стильные и удобные сапоги для женщин", cost: 80, sale: 10, photo: "women_boots.jpg", category: categories[1] },
            { title: "Микроволновая печь", description: "Компактная микроволновая печь с множеством функций", cost: 150, sale: 20, photo: "microwave.jpg", category: categories[2] },
            { title: "Пылесос", description: "Мощный пылесос для уборки дома", cost: 200, sale: 25, photo: "vacuum_cleaner.jpg", category: categories[2] },
            { title: "Велотренажер", description: "Удобный велотренажер для домашних тренировок", cost: 300, sale: 15, photo: "exercise_bike.jpg", category: categories[3] },
            { title: "Гантели 5 кг", description: "Набор гантелей для силовых тренировок", cost: 50, sale: 5, photo: "dumbbells.jpg", category: categories[3] },
            { title: "Фантастика 'Дюна'", description: "Популярный роман Фрэнка Герберта", cost: 20, sale: 10, photo: "dune.jpg", category: categories[4] },
            { title: "История России", description: "Учебник по истории для старших классов", cost: 45, sale: 5, photo: "history_russia.jpg", category: categories[4] },
            { title: "Планшет", description: "Лёгкий и мощный планшет для работы и развлечений", cost: 299, sale: 20, photo: "tablet.jpg", category: categories[0] },
        ];

        for (const prodData of productsData) {
            const product = productRepo.create({
                title: prodData.title,
                description: prodData.description,
                cost: prodData.cost,
                sale: prodData.sale,
                photo: prodData.photo,
                category: prodData.category,
            });
            await productRepo.save(product);
        }

        console.log("Продукты успешно созданы!");

        await AppDataSource.destroy();
        console.log("Data Source has been destroyed!");
    } catch (error) {
        console.error("Ошибка при заполнении базы данных:", error);
    }
};

seed();
