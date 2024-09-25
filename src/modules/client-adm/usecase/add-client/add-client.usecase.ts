import ID from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";

export default class AddClientUsecase {
    constructor(private readonly repository: ClientGateway) {
        this.repository = repository
    }

    async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
        const client = new Client({
            id: new ID(input.id),
            name: input.name,
            email: input.email,
            document: "123",
            street: "abc",
            number: "123",
            complement: "abc",
            city: "abc",
            state: "abc",
            zipCode: "123"
        })

        await this.repository.add(client)

        return {
            id: client.ID.Value,
            name: client.Name,
            email: client.Email,
            document: client.Document,
            street: client.Street,
            number: client.Number,
            complement: client.Complement,
            city: client.City,
            state: client.State,
            zipCode: client.ZipCode,
            createdAt: client.CreatedAt,
            updatedAt: client.UpdatedAt
        }
    }
}
