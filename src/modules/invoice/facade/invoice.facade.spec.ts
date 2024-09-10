import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Product facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true, },
        })
        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => await sequelize.close())

    it("should generate a invoice", async () => {
        const facade = InvoiceFacadeFactory.create()

        const input = {
            name: "foo",
            document: "123",
            street: "test",
            number: "123",
            city: "test",
            complement: "test",
            state: "T",
            zipCode: "123",
            items: [
                {
                    id: "1",
                    name: 'test',
                    price: 10
                },
                {
                    id: "2",
                    name: 'test',
                    price: 10
                }
            ],
        }

        const output = await facade.generate(input)
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.city).toBe(input.city)
        expect(output.complement).toBe(input.complement)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.items).toHaveLength(input.items.length)
        expect(output.total).toBe(20)
    })

    it("should find a invoice", async () => {
        const facade = InvoiceFacadeFactory.create()

        const input = {
            name: "foo",
            document: "123",
            street: "test",
            number: "123",
            city: "test",
            complement: "test",
            state: "T",
            zipCode: "123",
            items: [
                {
                    id: "1",
                    name: 'test',
                    price: 10
                },
                {
                    id: "2",
                    name: 'test',
                    price: 10
                }
            ],
        }

        const output = await facade.generate(input)

        const invoice = await facade.find({ id: output.id })
        expect(invoice.id).toBeDefined()
        expect(invoice.name).toBe(input.name)
        expect(invoice.document).toBe(input.document)
        expect(invoice.address.street).toBe(input.street)
        expect(invoice.address.number).toBe(input.number)
        expect(invoice.address.city).toBe(input.city)
        expect(invoice.address.complement).toBe(input.complement)
        expect(invoice.address.state).toBe(input.state)
        expect(invoice.address.zipCode).toBe(input.zipCode)
        expect(invoice.items).toHaveLength(input.items.length)
        expect(invoice.total).toBe(20)
    })
})
