import { Sequelize } from "sequelize-typescript"
import ID from "../../@shared/domain/value-object/id.value-object"
import InvoiceItemModel from "./invoice-item.model"
import InvoiceModel from "./invoice.model"
import InvoiceRepository from "./invoice.repository"

describe('Invoice repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true,
            }
        })

        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a invoice", async () => {
        const invoiceMocked = {
            id: new ID("1").Value,
            name: "test",
            document: "test",
            street: "test",
            number: 123,
            complement: "test",
            city: "test",
            state: "test",
            zipcode: "123",
        }

        await InvoiceModel.create(invoiceMocked)

        const repository = new InvoiceRepository()
        const invoice = await repository.find(invoiceMocked.id)

        expect(invoice.ID.Value).toBe(invoiceMocked.id)
        expect(invoice.Name).toBe(invoiceMocked.name)
        expect(invoice.Document).toBe(invoiceMocked.document)
    })
})
