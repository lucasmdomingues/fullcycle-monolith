import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface UsecaseProps {
    addUsecase: UsecaseInterface,
    findUsecase: UsecaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private addUsecase: UsecaseInterface;
    private findUsecase: UsecaseInterface

    constructor(props: UsecaseProps) {
        this.addUsecase = props.addUsecase;
        this.findUsecase = props.findUsecase;
    }

    async add(input: AddClientFacadeInputDTO): Promise<void> {
        await this.addUsecase.execute(input)
    }

    async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return await this.findUsecase.execute(input)
    }
}