import ID from "../../../@shared/domain/value-object/id.value-object"
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface"
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface"
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface"
import ProductAdmFacadeInterface, { CheckStockFacadeInputDto } from "../../../product-adm/facade/product-adm.facade.interface"
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface"
import Product from "../../domain/product.entity"
import CheckoutGateway from "../../gateway/checkout.gateway"
import { PlaceOrderInputDTO } from "./place-order.dto"
import PlaceOrderUsecase from "./place-order.usecase"

const dateMocked = new Date(2000, 1, 1)

let checkoutRepositoryDummy: CheckoutGateway;
let invoiceFacadeDummy: InvoiceFacadeInterface;
let paymentFacadeDummy: PaymentFacadeInterface;
let clientFacadeDummy: ClientAdmFacadeInterface;
let productFacadeDummy: ProductAdmFacadeInterface;
let catalogFacadeDummy: StoreCatalogFacadeInterface;

describe("Place order usecase unit test", () => {
    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers()
            jest.setSystemTime(dateMocked)
        })

        afterAll(() => jest.useRealTimers())


        it("should throw an error when client not found", async () => {
            const clientFacadeMock = {
                find: jest.fn().mockResolvedValue(null),
                add: jest.fn()
            }

            const usecase = new PlaceOrderUsecase(checkoutRepositoryDummy, clientFacadeMock, productFacadeDummy, catalogFacadeDummy,
                invoiceFacadeDummy, paymentFacadeDummy)
            const input: PlaceOrderInputDTO = { clientID: "0", products: [] }

            expect(async () => usecase.execute(input)).rejects.toThrow(new Error("Client not found"))
        })

        describe("place an order", () => {
            const clientProps = {
                id: "1c",
                name: "Client 0",
                document: "0000",
                email: "client@user.com",
                street: "some address",
                number: "1",
                complement: "",
                city: "some city",
                state: "some state",
                zipCode: "000"
            }

            const clientFacadeMock = {
                find: jest.fn().mockResolvedValue(clientProps),
                add: jest.fn()
            }

            const paymentFacadeMock = {
                process: jest.fn()
            }

            const checkouRepositoryMock = {
                addOrder: jest.fn(),
                findOrder: jest.fn(),
            }

            const invoiceFacadeMock = {
                find: jest.fn(),
                generate: jest.fn().mockReturnValue({id: "1i"})
            }

            const usecase = new PlaceOrderUsecase(
                checkouRepositoryMock,
                clientFacadeMock,
                productFacadeDummy,
                catalogFacadeDummy,
                invoiceFacadeMock,
                paymentFacadeMock,
            )

            const products = new Map<string, Product>([
                [
                    '1', new Product({
                        id: new ID("1"),
                        name: "test",
                        description: "test",
                        salesPrice: 40
                    })
                ],
                [
                    '2', new Product({
                        id: new ID("2"),
                        name: "test",
                        description: "test",
                        salesPrice: 30
                    })
                ],
            ])

            const validateProductsSpy = jest.spyOn(usecase, "validateProducts").mockResolvedValue(null)
            const getProductSpy = jest.spyOn(usecase, "getProduct").mockImplementation((productID: string) => Promise.resolve(products.get(productID)))

            it("should not be approved", async () => {
                paymentFacadeMock.process = paymentFacadeMock.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createdAt: new Date(),
                    updateAt: new Date(),
                })

                const input: PlaceOrderInputDTO = {
                    clientID: "1c",
                    products: [{ id: "1" }, { id: "2" }]
                }

                const output = await usecase.execute(input)

                expect(output.invoiceID).toBe(null)
                expect(output.total).toBe(70)
                expect(output.products).toStrictEqual(input.products)

                expect(clientFacadeMock.find).toHaveBeenCalled()
                expect(clientFacadeMock.find).toHaveBeenLastCalledWith({ id: "1c" })

                expect(validateProductsSpy).toHaveBeenCalled()
                expect(validateProductsSpy).toHaveBeenCalledWith(input)

                expect(getProductSpy).toHaveBeenCalledTimes(2)
                expect(checkouRepositoryMock.addOrder).toHaveBeenCalledTimes(0)

                expect(paymentFacadeMock.process).toHaveBeenCalled()
                expect(paymentFacadeMock.process).toHaveBeenCalledWith({ orderID: output.id, amount: output.total })

                expect(invoiceFacadeMock.generate).toHaveBeenCalledTimes(0)
            })

            it("should be approved", async () => {
                paymentFacadeMock.process = paymentFacadeMock.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "approved",
                    createdAt: new Date(),
                    updateAt: new Date(),
                })

                const input: PlaceOrderInputDTO = {
                    clientID: "1c",
                    products: [{ id: "1" }, { id: "2" }]
                }

                const output = await usecase.execute(input)

                expect(output.invoiceID).toBe("1i")
                expect(output.total).toBe(70)
                expect(output.products).toStrictEqual(input.products)

                expect(clientFacadeMock.find).toHaveBeenCalled()
                expect(clientFacadeMock.find).toHaveBeenLastCalledWith({ id: "1c" })

                expect(validateProductsSpy).toHaveBeenCalled()
                expect(validateProductsSpy).toHaveBeenCalledWith(input)

                expect(getProductSpy).toHaveBeenCalledTimes(2)
                expect(checkouRepositoryMock.addOrder).toHaveBeenCalled()

                expect(paymentFacadeMock.process).toHaveBeenCalled()
                expect(paymentFacadeMock.process).toHaveBeenCalledWith({ orderID: output.id, amount: output.total })

                expect(invoiceFacadeMock.generate).toHaveBeenCalled()
            })
        })
    })

    describe("validate products method", () => {
        const clientFacadeMock = {
            find: jest.fn().mockResolvedValue(true),
            add: jest.fn()
        }

        const productFacadeMock = {
            addProduct: jest.fn(),
            checkStock: jest.fn().mockImplementation((input: CheckStockFacadeInputDto) => Promise.resolve({
                productId: input.productId,
                stock: input.productId === "1" ? 0 : 1
            }))
        }

        it("should throw an error when not products selected", async () => {
            const usecase = new PlaceOrderUsecase(checkoutRepositoryDummy, clientFacadeMock, productFacadeDummy, catalogFacadeDummy,
                invoiceFacadeDummy, paymentFacadeDummy)
            const input: PlaceOrderInputDTO = { clientID: "1", products: [] }

            expect(async () => usecase.execute(input)).rejects.toThrow("No products selected")
        })

        it("should throw an error when product is out of stock", async () => {
            const input: PlaceOrderInputDTO = { clientID: "1", products: [{ id: "1" }] }
            const usecase = new PlaceOrderUsecase(checkoutRepositoryDummy, clientFacadeMock, productFacadeMock, catalogFacadeDummy,
                invoiceFacadeDummy, paymentFacadeDummy)

            expect(async () => usecase.execute(input)).rejects.toThrow("Product 1 is not available in stock")
        })
    })

    describe("get product method", () => {
        beforeAll(() => {
            jest.useFakeTimers()
            jest.setSystemTime(dateMocked)
        })

        afterAll(() => jest.useRealTimers())

        const clientFacadeMock = {
            find: jest.fn().mockResolvedValue(true),
            add: jest.fn()
        }

        const productFacadeMock = {
            addProduct: jest.fn(),
            checkStock: jest.fn().mockImplementation((input: CheckStockFacadeInputDto) => Promise.resolve({
                productId: input.productId,
                stock: input.productId === "1" ? 0 : 1
            }))
        }

        it("should throw an error when product not found", async () => {
            const catalogFacadeMock = {
                find: jest.fn().mockResolvedValue(null),
                findAll: jest.fn()
            }

            const input: PlaceOrderInputDTO = { clientID: "1", products: [{ id: "2" }] }

            const usecase = new PlaceOrderUsecase(checkoutRepositoryDummy, clientFacadeMock, productFacadeMock,
                catalogFacadeMock, invoiceFacadeDummy, paymentFacadeDummy)
            await expect(usecase.execute(input)).rejects.toThrow("Product not found")
            expect(catalogFacadeMock.find).toHaveBeenCalled()
        })
    })
})
