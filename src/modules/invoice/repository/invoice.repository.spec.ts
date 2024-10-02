import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address.value-object"
import ID from "../../@shared/domain/value-object/id.value-object"
import InvoiceItem from "../domain/invoice-item.entity"
import Invoice from "../domain/invoice.entity"
import InvoiceItemModel from "./invoice-item.model"
import InvoiceModel from "./invoice.model"
import InvoiceRepository from "./invoice.repository"

const invoiceMocked = new Invoice({
    id: new ID("1"),
    name: "invoice test",
    document: "123",
    address: new Address({
        street: "some street",
        number: "123",
        city: "some city",
        complement: "some complement",
        state: "some state",
        zipCode: "123"
    }),
    items: [
        new InvoiceItem({
            id: new ID("1"),
            name: "some item",
            price: 10
        }),
        new InvoiceItem({
            id: new ID("2"),
            name: "other item",
            price: 10
        })
    ]
})

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
        const invoiceID = new ID()

        await InvoiceModel.create({
            id: invoiceID.Value,
            name: invoiceMocked.Name,
            document: invoiceMocked.Document,
            street: invoiceMocked.Address.Street,
            number: invoiceMocked.Address.Number,
            complement: invoiceMocked.Address.Complement,
            city: invoiceMocked.Address.City,
            state: invoiceMocked.Address.State,
            zipcode: invoiceMocked.Address.ZipCode,
            items: invoiceMocked.Items.map((item) => ({
                id: item.ID.Value,
                invoiceID: invoiceID,
                name: item.Name,
                price: item.Price,
            }))
        }, {
            include: [{
                model: InvoiceItemModel
            }]
        })

        const repository = new InvoiceRepository()
        const invoice = await repository.find(invoiceID.Value)

        expect(invoice.ID).toStrictEqual(invoiceID)
        expect(invoice.Name).toBe(invoiceMocked.Name)
        expect(invoice.Document).toBe(invoiceMocked.Document)
        expect(invoice.Address).toStrictEqual(invoiceMocked.Address)
        expect(invoice.Items).toHaveLength(invoiceMocked.Items.length)
    })

    it("should generate a invoice", async () => {
        const repository = new InvoiceRepository()

        await repository.generate(invoiceMocked)

        const invoice = await repository.find(invoiceMocked.ID.Value)
        expect(invoice.ID).toStrictEqual(invoiceMocked.ID)
        expect(invoice.Name).toBe(invoiceMocked.Name)
        expect(invoice.Document).toBe(invoiceMocked.Document)
        expect(invoice.Address).toStrictEqual(invoiceMocked.Address)
        expect(invoice.Items).toHaveLength(invoiceMocked.Items.length)
    })
})
