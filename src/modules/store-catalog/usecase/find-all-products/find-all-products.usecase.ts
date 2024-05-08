import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDtoOutput } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UsecaseInterface {
    constructor(private repository: ProductGateway) { }

    async execute(): Promise<FindAllProductsDtoOutput> {
        const data = await this.repository.findAll()
        return {
            products: data.map((product) => ({
                id: product.ID.Value,
                name: product.Name,
                description: product.Description,
                salesPrice: product.SalesPrice,
            }))
        }
    }
}