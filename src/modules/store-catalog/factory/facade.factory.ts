import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade { 
        const repository = new ProductRepository()
        const findUsecase = new FindProductUsecase(repository)
        const findAllUsecase = new FindAllProductsUsecase(repository)
        const facade = new StoreCatalogFacade({
            findUsecase: findUsecase,
            findAllUsecase: findAllUsecase
        })

        return facade
    }
}