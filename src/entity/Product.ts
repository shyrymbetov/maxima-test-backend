import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    cost!: number;

    @Column()
    sale!: number;

    @Column()
    photo!: string;

    @ManyToOne(() => Category, category => category.id)
    category!: Category;
}
