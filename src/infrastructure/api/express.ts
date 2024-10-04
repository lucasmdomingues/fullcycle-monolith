import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../modules/product-adm/repository/product.model";
import ProductRepository from "../../modules/product-adm/repository/product.repository";
import { NewProductRouter } from "./routes/product";
import ClientModel from "../../modules/client-adm/repository/client.model";
import ClientRepository from "../../modules/client-adm/repository/client.repository";
import { NewClientRouter } from "./routes/client";

export async function NewExpress(): Promise<Express> {
    const app: Express = express();
    app.use(express.json());

    const productRepository = new ProductRepository()
    const productRouter = NewProductRouter(productRepository)

    const clientRepository = new ClientRepository()
    const clientRouter = NewClientRouter(clientRepository)

    app.use('/products', productRouter)
    app.use('/clients', clientRouter)

    return app
}

export async function NewSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    sequelize.addModels([ProductModel, ClientModel])

    await sequelize.sync();

    return sequelize
}
