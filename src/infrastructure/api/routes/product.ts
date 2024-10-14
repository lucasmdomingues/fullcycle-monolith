import express, { Request, Response, Router } from "express"
import ProductGateway from "../../../modules/product-adm/gateway/product.gateway"
import AddProductUsecase from "../../../modules/product-adm/usecase/add-product/add-product.usecase"

export function NewProductRouter(repository: ProductGateway): Router {
    const router = express.Router()
    const usecase = new AddProductUsecase(repository)

    router.post("/", async (req: Request, res: Response) => {
        try {
            const output = await usecase.execute({
                name: req.body.name,
                description: req.body.description,
                purchasePrice: req.body.purchasePrice,
                stock: req.body.stock
            })

            res.send(output)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router
}
