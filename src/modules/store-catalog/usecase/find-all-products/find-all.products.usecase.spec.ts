import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const p1 = new Product({
    id: new ID("1"),
    name: "",
    description: "",
    salesPrice: 100
})

const p2 = new Product({
    id: new ID("1"),
    name: "",
    description: "",
    salesPrice: 100
})

const productsMock = [p1, p2]

const repositoryMock = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve(productsMock)),
        find: jest.fn()
    }
}

describe("Find all products usecase unit test", () => {
    it("should find all producs", async () => {
        const repository = repositoryMock()
        const usecase = new FindAllProductsUsecase(repository)

        const output = await usecase.execute()
        expect(repository.findAll).toHaveBeenCalled()
        expect(output.products).toHaveLength(2)

        output.products.forEach((product, i) => {
            expect(product.id).toBe(productsMock[i].ID.Value)
            expect(product.name).toBe(productsMock[i].Name)
            expect(product.description).toBe(productsMock[i].Description)
            expect(product.salesPrice).toBe(productsMock[i].SalesPrice)
        })
    })
})