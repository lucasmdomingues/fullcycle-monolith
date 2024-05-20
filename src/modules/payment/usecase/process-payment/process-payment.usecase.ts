import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UsecaseInterface {
    constructor(
        private repository: PaymentGateway
    ) { }

    async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
        const transaction = new Transaction({
            orderID: input.orderID,
            amount: input.amount,
        })

        transaction.process()

        const transactionPersisted = await this.repository.save(transaction)

        return {
            transactionID: transactionPersisted.ID.Value,
            orderID: transactionPersisted.OrderID,
            amount: transactionPersisted.Amount,
            status: transaction.Status,
            createdAt: transactionPersisted.CreatedAt,
            updatedAt: transactionPersisted.UpdatedAt
        }
    }
}