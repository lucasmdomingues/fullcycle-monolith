import express, { Request, Response, Router } from "express"
import CheckoutGateway from "../../../modules/checkout/gateway/checkout.gateway"
import PlaceOrderUsecase from "../../../modules/checkout/usecase/place-order/place-order.usecase"
import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/client-adm.facade.interface"
import InvoiceFacadeInterface from "../../../modules/invoice/facade/invoice.facade.interface"
import PaymentFacadeInterface from "../../../modules/payment/facade/payment.facade.interface"
import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/product-adm.facade.interface"
import StoreCatalogFacadeInterface from "../../../modules/store-catalog/facade/store-catalog.facade.interface"

export function NewCheckoutRouter(
    repository: CheckoutGateway,
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
): Router {
    const router = express.Router()

    router.post("/", async (req: Request, res: Response) => {
        const usecase = new PlaceOrderUsecase(
            repository,
            clientFacade,
            productFacade,
            catalogFacade,
            invoiceFacade,
            paymentFacade
        )

        try {
            const output = await usecase.execute({
                clientID: req.body.clientID,
                products: req.body.products
            })

            res.send(output)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router
}
