export interface ProcessPaymentInputDTO {
    orderID: string;
    amount: number;
}

export interface ProcessPaymentOutputDTO {
    transactionID: string;
    orderID: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}