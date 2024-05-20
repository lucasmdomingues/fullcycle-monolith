export interface PaymentFacadeInputDTO {
    orderID: string;
    amount: number;
}

export interface PaymentFacadeOutputDTO {
    transactionID: string;
    orderID: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface PaymentFacadeInterface {
    process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>
}