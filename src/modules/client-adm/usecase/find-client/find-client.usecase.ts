import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.usecase.dto";

export default class FindClientUsecase {
    constructor(
        private readonly repository: ClientGateway
    ) { }

    async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
        const client = await this.repository.find(input.id)
        return {
            id: client.ID.Value,
            name: client.Name,
            email: client.Email,
            document: client.Document,
            street: client.Street,
            complement: client.Complement,
            number: client.Number,
            city: client.City,
            state: client.State,
            zipCode: client.ZipCode,
            createdAt: client.CreatedAt,
            updatedAt: client.UpdatedAt
        }
    }
}
