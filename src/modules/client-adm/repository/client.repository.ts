import ID from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
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
        })
    }

    async find(id: string): Promise<Client> {
        const clientModel = await ClientModel.findOne({
            where: { id }
        })

        if (!clientModel) throw new Error("Client not found");

        return new Client({
            id: new ID(clientModel.id),
            name: clientModel.name,
            email: clientModel.email,
            document: clientModel.document,
            street: clientModel.street,
            number: clientModel.number,
            complement: clientModel.complement,
            city: clientModel.city,
            state: clientModel.state,
            zipCode: clientModel.zipCode,
            createdAt: clientModel.createdAt,
            updatedAt: clientModel.updatedAt
        })
    }
}
