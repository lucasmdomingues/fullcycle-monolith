export interface FindAllProductsDtoOutput {
    products: {
        id: string;
        name: string;
        description: string;
        purchasePrice: number;
        stock: number
    }[]
}
