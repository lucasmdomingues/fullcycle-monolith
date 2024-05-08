import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";

export default class FindProductUsecase {
    constructor(private readonly repository: ProductGateway) { }

    async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
        const product = await this.repository.find(input.id)

        return {
            id: product.ID.Value,
            name: product.Name,
            description: product.Description,
            salesPrice: product.SalesPrice
        }
    }
}