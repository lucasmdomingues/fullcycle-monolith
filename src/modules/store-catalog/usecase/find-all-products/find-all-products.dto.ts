export interface FindAllProductsDtoOutput {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
}

