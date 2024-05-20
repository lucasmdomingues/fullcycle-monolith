import ID from "../../../@shared/domain/value-object/id.value-object";
import Transaction, { PaymentStatusApproved, PaymentStatusDeclined } from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transactionMocked = new Transaction({
    id: new ID("1"),
    amount: 100,
    orderID: "1",
})

const repositoryMock = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionMocked))
    }
}

describe("Process payment usecase unit test", () => {
    it("should approve a transaction", async () => {
        const repository = repositoryMock()
        const usecase = new ProcessPaymentUsecase(repository)

        const input = {
            orderID: "1",
            amount: 100
        }

        const output = await usecase.execute(input)
        expect(repository.save).toHaveBeenCalled()
        expect(output.transactionID).toBe(transactionMocked.ID.Value)
        expect(output.amount).toBe(transactionMocked.Amount)
        expect(output.status).toBe(PaymentStatusApproved)
        expect(output.orderID).toBe(transactionMocked.OrderID)
        expect(output.createdAt).toBe(transactionMocked.CreatedAt)
        expect(output.updatedAt).toBe(transactionMocked.UpdatedAt)
    })

    it("should decline a transaction", async () => {
        const repository = repositoryMock()
        const usecase = new ProcessPaymentUsecase(repository)

        const input = {
            orderID: "1",
            amount: 99
        }

        const output = await usecase.execute(input)
        expect(repository.save).toHaveBeenCalled()
        expect(output.transactionID).toBe(transactionMocked.ID.Value)
        expect(output.amount).toBe(transactionMocked.Amount)
        expect(output.status).toBe(PaymentStatusDeclined)
        expect(output.orderID).toBe(transactionMocked.OrderID)
        expect(output.createdAt).toBe(transactionMocked.CreatedAt)
        expect(output.updatedAt).toBe(transactionMocked.UpdatedAt)
    })
})