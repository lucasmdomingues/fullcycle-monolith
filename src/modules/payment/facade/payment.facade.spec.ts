import { Sequelize } from "sequelize-typescript";
import { PaymentStatusApproved } from "../domain/transaction";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import TransactionModel from "../repository/transaction.model";

describe('Transaction repository test', () => {
    let sequelize: Sequelize;

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

    afterEach(async () => await sequelize.close())

    it("should create a transaction", async () => {
        const facade = PaymentFacadeFactory.create()

        const input = {
            orderID: "order-1",
            amount: 100
        }

        const output = await facade.process(input)
        expect(output.transactionID).toBeDefined()
        expect(output.orderID).toBe(input.orderID)
        expect(output.status).toBe(PaymentStatusApproved)
    })
})