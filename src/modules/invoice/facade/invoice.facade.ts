import UsecaseInterface from "../../@shared/usecase/usecase.interface"
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO } from "./invoice.facade.interface";

type InvoiceFacadeProps = {
    findUsecase: UsecaseInterface,
}

export default class InvoiceFacade {
    private findUsecase: UsecaseInterface;

    constructor(props: InvoiceFacadeProps) {
        this.findUsecase = props.findUsecase;
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>{
        return this.findUsecase.execute(input)
    }
}
