import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";

export default class CheckoutRepository implements CheckoutGateway {
    addOrder(order: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findOrder(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
}
