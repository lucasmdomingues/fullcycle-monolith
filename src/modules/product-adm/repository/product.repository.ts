import ID from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
       await ProductModel.create({
            id: product.ID.Value,
            name: product.Name,
            description: product.Description,
            purchasePrice: product.PurchasePrice,
            stock: product.Stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async find(id: string): Promise<Product> {
        const data = await ProductModel.findOne({
            where: { id }
        })

        if (!data) throw new Error(`Product with id ${id} not found`);

        return new Product({
            id: new ID(data.id),
            name: data.name,
            description: data.description,
            purchasePrice: data.purchasePrice,
            stock: data.stock,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        })
    }
}