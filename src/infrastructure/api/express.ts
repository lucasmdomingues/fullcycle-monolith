import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../modules/product-adm/repository/product.model";
import ProductRepository from "../../modules/product-adm/repository/product.repository";
import { NewProductRouter } from "./routes/product";

export async function NewExpress(): Promise<Express> {
    const app: Express = express();
    app.use(express.json());

    const productRepository = new ProductRepository()
    const productRouter = NewProductRouter(productRepository)

    app.use('/products', productRouter)

    return app
}

export async function NewSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    sequelize.addModels([ProductModel])

    await sequelize.sync();

    return sequelize
}
