import ID from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./place-order.dto";


export default class PlaceOrderUsecase implements UsecaseInterface {
    constructor(
        private repository: CheckoutGateway,
        private clientFacade: ClientAdmFacadeInterface,
        private productFacade: ProductAdmFacadeInterface,
        private catalogFacade: StoreCatalogFacadeInterface,
        private invoiceFacade: InvoiceFacadeInterface,
        private paymentFacade: PaymentFacadeInterface,
    ) { }

    async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
        const client = await this.clientFacade.find({ id: input.clientID })
        if (!client) throw new Error("Client not found")

        await this.validateProducts(input)

        const products = await Promise.all(input.products.map((product) => this.getProduct(product.id)))

        const myClient = new Client({
            id: new ID(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
        })

        const order = new Order({
            client: myClient,
            produts: products,
        })

        const payment = await this.paymentFacade.process({
            orderID: order.ID.Value,
            amount: order.Total
        })

        let invoice: any;

        if (payment.status === "approved") {
            invoice = await this.invoiceFacade.generate({
                name: myClient.Name,
                document: myClient.Document,
                street: myClient.Street,
                number: myClient.Number,
                complement: myClient.Complement,
                city: myClient.City,
                state: myClient.State,
                zipCode: myClient.ZipCode,
                items: order.Products.map((product) => ({
                    id: product.ID.Value,
                    name: product.Name,
                    price: product.SalesPrice
                }))
            })
            order.approved()
            await this.repository.addOrder(order)
        } else {
            invoice = null
        }

        return {
            id: order.ID.Value,
            invoiceID: payment.status === "approved" ? invoice.id : null,
            status: order.Status,
            total: order.Total,
            products: order.Products.map((product) => ({
                id: product.ID.Value,
            }))
        }
    }

    async validateProducts(input: PlaceOrderInputDTO): Promise<void> {
        if (input.products.length === 0) throw new Error("No products selected");

        for (const product of input.products) {
            const output = await this.productFacade.checkStock({ productId: product.id })
            if (output.stock <= 0) throw new Error(`Product ${product.id} is not available in stock`);
        }
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.catalogFacade.find({ id: productID })
        if (!product) throw new Error("Product not found");

        return new Product({
            id: new ID(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
}
