import Address from "../../../@shared/domain/value-object/address.value-object";
import ID from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.dto";

export default class GenerateInvoiceUsecase implements UsecaseInterface {
    constructor(
        private repository: InvoiceGateway
    ) { }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const addresss = new Address({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        })

        const items = input.items.map((item) => new InvoiceItem({
            id: new ID(item.id),
            name: item.name,
            price: item.price
        }))

        const invoice = new Invoice({
            id: new ID(),
            name: input.name,
            document: input.document,
            address: addresss,
            items: items
        })

        await this.repository.generate(invoice)

        return {
            id: invoice.ID.Value,
            name: invoice.Name,
            document: invoice.Document,
            street: invoice.Address.Street,
            number: invoice.Address.Number,
            complement: invoice.Address.Complement,
            city: invoice.Address.City,
            state: invoice.Address.State,
            zipCode: invoice.Address.ZipCode,
            items: invoice.Items.map((item) => ({
                id: item.ID.Value,
                name: item.Name,
                price: item.Price,
            })),
            total: invoice.calculateTotal()
        }
    }
}
