import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUsecase: UsecaseInterface;
    checkStockUsecase: UsecaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private addUsecase: UsecaseInterface;
    private checkStockUsecase: UsecaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this.addUsecase = usecaseProps.addUsecase
        this.checkStockUsecase = usecaseProps.checkStockUsecase
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // if dto usecase and dto facade is not equal, we need convert facade to usecase
        return this.addUsecase.execute(input)
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this.checkStockUsecase.execute(input)
    }
}