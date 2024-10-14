import express, { Request, Response, Router } from "express"
import InvoiceGateway from "../../../modules/invoice/gateway/invoice.gateway"
import FindInvoiceUsecase from "../../../modules/invoice/usecase/find/find.usecase"

export function NewInvoiceRouter(repository: InvoiceGateway,): Router {
    const router = express.Router()
    const usecase = new FindInvoiceUsecase(repository)

    router.get("/:id", async (req: Request, res: Response) => {
        try {
            const output = await usecase.execute({
                id: req.params.id
            })

            res.send(output)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router
}
