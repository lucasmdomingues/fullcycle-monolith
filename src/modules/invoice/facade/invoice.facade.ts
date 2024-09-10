import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

type InvoiceFacadeProps = {
    findUsecase: UsecaseInterface,
    generateUsecase: UsecaseInterface
}

export default class InvoiceFacade {
    private findUsecase: UsecaseInterface;
    private generateUsecase: UsecaseInterface;

    constructor(props: InvoiceFacadeProps) {
        this.findUsecase = props.findUsecase;
        this.generateUsecase = props.generateUsecase
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this.findUsecase.execute(input)
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>{
        return this.generateUsecase.execute(input)
    }
}
