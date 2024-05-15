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
            address: input.address
        })

        await this.repository.add(client)

        return {
            id: client.ID.Value,
            name: client.Name,
            email: client.Email,
            address: client.Address,
            createdAt: client.CreatedAt,
            updatedAt: client.UpdatedAt
        }
    }
}