export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export interface CheckStockFacadeOutputDto {
    productId: string;
    stock: number;
}

export interface FindProductFacadeInputDTO {
    id: string;
}

export interface FindProductFacadeOutputDTO {
    id: string;
    name: string;
    description: string;
    purchasePrice: number
}

export interface FindAllProductsFacadeOutputDTO {
    products: {
        id: string
        name: string
        description: string
        purchasePrice: number,
        stock: number
    }[]
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
    find(input: FindProductFacadeInputDTO): Promise<FindProductFacadeOutputDTO>
    findAll(): Promise<FindAllProductsFacadeOutputDTO>
}
