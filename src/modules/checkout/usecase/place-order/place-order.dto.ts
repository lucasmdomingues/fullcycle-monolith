export interface PlaceOrderInputDTO {
    clientID: string;
    products: {
        id: string
    }[]
}

export interface PlaceOrderOutputDTO {
    id: string;
    invoiceID: string | null;
    status: string;
    total: number;
    products: {
        id: string
    }[]
}
