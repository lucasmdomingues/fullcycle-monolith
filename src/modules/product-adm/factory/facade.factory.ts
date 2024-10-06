import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const repository = new ProductRepository()
        const addProductUsecase = new AddProductUsecase(repository)
        const checkStockUsecase = new CheckStockUsecase(repository)
        const findUsecase = new FindProductUsecase(repository)
        const findAllUsecase = new FindAllProductsUsecase(repository)

        const facade = new ProductAdmFacade({
            addUsecase: addProductUsecase,
            checkStockUsecase: checkStockUsecase,
            findUsecase: findUsecase,
            findAllUsecase: findAllUsecase
        })

        return facade
    }
}
