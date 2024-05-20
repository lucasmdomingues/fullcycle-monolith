import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model"
import Transaction from "../domain/transaction"
import ID from "../../@shared/domain/value-object/id.value-object"
import TransactionRepository from "./transaction.repository"

describe('Transaction repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true, },
        })
        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new ID("1"),
            amount: 100,
            orderID: "1"
        })
        transaction.process()

        const repository = new TransactionRepository()
        const output = await repository.save(transaction)

        expect(output.ID).toEqual(output.ID)
        expect(output.OrderID).toBe(output.OrderID)
        expect(output.Amount).toBe(output.Amount)
        expect(output.Status).toBe(output.Status)
        expect(output.CreatedAt).toBe(output.CreatedAt)
        expect(output.UpdatedAt).toBe(output.UpdatedAt)
    })
})