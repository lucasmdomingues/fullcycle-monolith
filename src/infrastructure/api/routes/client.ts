import express, { Request, Response, Router } from "express"
import ClientGateway from "../../../modules/client-adm/gateway/client.gateway"
import AddClientUsecase from "../../../modules/client-adm/usecase/add-client/add-client.usecase"

export function NewClientRouter(repository: ClientGateway): Router {
    const router = express.Router()
    const usecase = new AddClientUsecase(repository)

    router.post("/", async (req: Request, res: Response) => {
        try {
            const output = await usecase.execute({
                name: req.body.name,
                email: req.body.email,
                document: req.body.document,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
            })

            res.send(output)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router
}
