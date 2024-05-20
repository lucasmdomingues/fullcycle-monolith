import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDTO, PaymentFacadeOutputDTO } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(
        private readonly usecase: UsecaseInterface
    ) { }

    async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
        return this.usecase.execute(input)
    }
}