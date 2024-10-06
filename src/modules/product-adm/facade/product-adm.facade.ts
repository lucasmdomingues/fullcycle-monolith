import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, FindAllProductsFacadeOutputDTO, FindProductFacadeInputDTO, FindProductFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUsecase: UsecaseInterface;
    checkStockUsecase: UsecaseInterface
    findUsecase: UsecaseInterface
    findAllUsecase: UsecaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private readonly addUsecase: UsecaseInterface;
    private readonly checkStockUsecase: UsecaseInterface;
    private readonly findUsecase: UsecaseInterface
    private readonly findAllUsecase: UsecaseInterface

    constructor(usecaseProps: UseCaseProps) {
        this.addUsecase = usecaseProps.addUsecase
        this.checkStockUsecase = usecaseProps.checkStockUsecase
        this.findUsecase = usecaseProps.findUsecase
        this.findAllUsecase = usecaseProps.findAllUsecase
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // if dto usecase and dto facade is not equal, we need convert facade to usecase
        return this.addUsecase.execute(input)
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this.checkStockUsecase.execute(input)
    }

    async find(input: FindProductFacadeInputDTO): Promise<FindProductFacadeOutputDTO> {
        return await this.findUsecase.execute(input)
    }
    async findAll(): Promise<FindAllProductsFacadeOutputDTO> {
        return await this.findAllUsecase.execute({})
    }
}
