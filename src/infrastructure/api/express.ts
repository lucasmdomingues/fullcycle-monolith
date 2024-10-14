import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import OrderClientModel from "../../modules/checkout/repository/order-client.model";
import OrderProductModel from "../../modules/checkout/repository/order-product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import CheckoutRepository from "../../modules/checkout/repository/order.repository";
import ClientAdmFacadeFactory from "../../modules/client-adm/facade/client-admn.facade.factory";
import ClientModel from "../../modules/client-adm/repository/client.model";
import ClientRepository from "../../modules/client-adm/repository/client.repository";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import ProductModel from "../../modules/product-adm/repository/product.model";
import ProductRepository from "../../modules/product-adm/repository/product.repository";
import { NewCheckoutRouter } from "./routes/checkout";
import { NewClientRouter } from "./routes/client";
import { NewProductRouter } from "./routes/product";
import InvoiceRepository from "../../modules/invoice/repository/invoice.repository";
import { NewInvoiceRouter } from "./routes/invoice";
import morgan from "morgan"

export async function NewExpress(sequelize: Sequelize): Promise<Express> {
    const app: Express = express();

    app.use(express.json());
    app.use(morgan("common", { skip: (req, res) => process.env.NODE_ENV === 'test' }))

    const clientFacade = ClientAdmFacadeFactory.create()
    const productFacade = ProductAdmFacadeFactory.create()
    const invoiceFacade = InvoiceFacadeFactory.create()
    const paymentFacade = PaymentFacadeFactory.create()

    const productRepository = new ProductRepository()
    const productRouter = NewProductRouter(productRepository)

    const clientRepository = new ClientRepository()
    const clientRouter = NewClientRouter(clientRepository)

    const checkoutRepository = new CheckoutRepository(sequelize)
    const checkoutRouter = NewCheckoutRouter(
        checkoutRepository,
        clientFacade,
        productFacade,
        invoiceFacade,
        paymentFacade
    )

    const invoiceRepository = new InvoiceRepository()
    const invoiceRouter = NewInvoiceRouter(invoiceRepository)

    app.use('/products', productRouter)
    app.use('/clients', clientRouter)
    app.use('/checkout', checkoutRouter)
    app.use('/invoice', invoiceRouter)

    return app
}

export async function NewSequelize(): Promise<Sequelize> {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })

    sequelize.addModels([
        ProductModel,
        ClientModel,
        OrderModel,
        OrderProductModel,
        OrderClientModel,
        InvoiceModel,
        InvoiceItemModel,
        TransactionModel
    ])

    await sequelize.sync();

    return sequelize
}
