import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export default class AddProductUsecase {
    private repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this.repository = repository
    }

    async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
        const product = new Product({
            id: new ID(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        })

        await this.repository.add(product)

        return {
            id: product.ID.Value,
            name: product.Name,
            description: product.Description,
            purchasePrice: product.PurchasePrice,
            stock: product.Stock,
            createdAt: product.CreatedAt,
            updatedAt: product.UpdateAt
        }
    }
}