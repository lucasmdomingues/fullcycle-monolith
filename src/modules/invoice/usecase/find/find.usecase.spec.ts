import Address from "../../../@shared/domain/value-object/address.value-object"
import ID from "../../../@shared/domain/value-object/id.value-object"
import InvoiceItem from "../../domain/invoice-item.entity"
import Invoice from "../../domain/invoice.entity"
import FindInvoiceUsecase from "./find.usecase"

const invoiceMocked = new Invoice({
    id: new ID('1'),
    name: "foo",
    document: "123",
    address: new Address({
        street: "test",
        number: "123",
        city: "test",
        complement: "test",
        state: "T",
        zipCode: "123"
    }),
    items: [
        new InvoiceItem({
            id: new ID('1'),
            name: 'test',
            price: 10
        }),
        new InvoiceItem({
            id: new ID('2'),
            name: 'test 2',
            price: 10
        }),
    ],
})

const repositoryMock = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoiceMocked)),
        generate: jest.fn()
    }
}

describe("Find invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const repository = repositoryMock()
        const usecase = new FindInvoiceUsecase(repository)

        const input = {
            id: "1"
        }

        const output = await usecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBe(invoiceMocked.ID.Value)
        expect(output.name).toBe(invoiceMocked.Name)
        expect(output.document).toBe(invoiceMocked.Document)
        expect(output.address).toBeDefined()
        expect(output.items).toHaveLength(2)
        expect(output.total).toBe(invoiceMocked.calculateTotal()) // Should be 20
        expect(output.createdAt).toBeDefined()
    })
})
