import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find.dto";

export default class FindInvoiceUsecase implements UsecaseInterface {
    constructor(
        private repository: InvoiceGateway
    ) { }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.repository.find(input.id)

        return {
            id: invoice.ID.Value,
            name: invoice.Name,
            document: invoice.Document,
            address: {
                street: invoice.Address.Street,
                number: invoice.Address.Number,
                complement: invoice.Address.Complement,
                city: invoice.Address.City,
                state: invoice.Address.State,
                zipCode: invoice.Address.ZipCode
            },
            items: invoice.Items.map((item) => ({
                id: item.ID.Value,
                name: item.Name,
                price: item.Price,
            })),
            total: invoice.calculateTotal(),
            createdAt: invoice.CreatedAt
        }
    }
}