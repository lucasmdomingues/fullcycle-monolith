import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUsecase {
    private repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this.repository = repository
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this.repository.find(input.productId)

        return {
            productId: product.ID.Value,
            stock: product.Stock
        }
    }
}