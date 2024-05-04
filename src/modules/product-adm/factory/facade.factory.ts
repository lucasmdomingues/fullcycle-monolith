import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const repository = new ProductRepository()
        const addProductUsecase = new AddProductUsecase(repository)
        const facade = new ProductAdmFacade({
            addUsecase: addProductUsecase,
            checkStockUsecase: null
        })

        return facade
    }
}