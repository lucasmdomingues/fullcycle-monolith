import express, { Request, Response, Router } from "express"
import CheckoutGateway from "../../../modules/checkout/gateway/checkout.gateway"
import PlaceOrderUsecase from "../../../modules/checkout/usecase/place-order/place-order.usecase"
import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/client-adm.facade.interface"
import InvoiceFacadeInterface from "../../../modules/invoice/facade/invoice.facade.interface"
import PaymentFacadeInterface from "../../../modules/payment/facade/payment.facade.interface"
import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/product-adm.facade.interface"

export function NewCheckoutRouter(
    repository: CheckoutGateway,
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
): Router {
    const router = express.Router()
    const usecase = new PlaceOrderUsecase(
        repository,
        clientFacade,
        productFacade,
        invoiceFacade,
        paymentFacade
    )

    router.post("/", async (req: Request, res: Response) => {
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
