import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.ID.Value,
            orderID: input.OrderID,
            amount: input.Amount,
            status: input.Status,
            createdAt: input.CreatedAt,
            updatedAt: input.UpdatedAt
        })

        return new Transaction({
            id: input.ID,
            orderID: input.OrderID,
            amount: input.Amount,
            status: input.Status,
            createdAt: input.CreatedAt,
            updatedAt: input.UpdatedAt
        })
    }
}