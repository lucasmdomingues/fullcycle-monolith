import Address from "../../@shared/domain/value-object/address.value-object";
import ID from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: { id },
            include: [{ model: InvoiceItemModel }],
        })

        if (!invoiceModel) throw new Error("invoice not found");

        const invoice = new Invoice({
            id: new ID(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address({
                city: invoiceModel.city,
                complement: invoiceModel.complement,
                number: invoiceModel.number,
                state: invoiceModel.state,
                street: invoiceModel.street,
                zipCode: invoiceModel.zipcode
            }),
            items: invoiceModel.items.map((item) => (new InvoiceItem({
                id: new ID(item.id),
                name: item.name,
                price: item.price
            })))
        })

        return invoice
    }

    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.ID.Value,
            name: invoice.Name,
            document: invoice.Document,
            street: invoice.Address.Street,
            number: invoice.Address.Number,
            complement: invoice.Address.Complement,
            city: invoice.Address.City,
            state: invoice.Address.State,
            zipcode: invoice.Address.ZipCode,
            items: invoice.Items.map((item) => ({
                id: item.ID.Value,
                invoiceID: invoice.ID.Value,
                name: item.Name,
                price: item.Price,
            }))
        }, {
            include: [{
                model: InvoiceItemModel
            }]
        })
    }
}
