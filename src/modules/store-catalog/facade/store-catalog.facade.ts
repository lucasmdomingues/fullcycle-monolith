import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import StoreCatalogFacadeInterface, { StoreCatalogFacadeFindAllOutputDTO, StoreCatalogFacadeFindInputDTO, StoreCatalogFacadeFindOutputDTO } from "./store-catalog.facade.interface";

export type StoreCatalogFacadeProps = {
    findUsecase: UsecaseInterface,
    findAllUsecase: UsecaseInterface,
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private readonly findUsecase: UsecaseInterface
    private readonly findAllUsecase: UsecaseInterface

    constructor(props: StoreCatalogFacadeProps) {
        this.findUsecase = props.findUsecase
        this.findAllUsecase = props.findAllUsecase
    }

    async find(input: StoreCatalogFacadeFindInputDTO): Promise<StoreCatalogFacadeFindOutputDTO> {
        return await this.findUsecase.execute(input)
    }
    async findAll(): Promise<StoreCatalogFacadeFindAllOutputDTO> {
        return await this.findAllUsecase.execute({})
    }
}