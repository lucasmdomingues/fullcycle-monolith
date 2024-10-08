export interface AddClientFacadeInputDTO {
    id?: string;
    name: string;
    email: string;
}

export interface FindClientFacadeInputDTO {
    id: string;
}

export interface FindClientFacadeOutputDTO {
    id: string;
    name: string;
    email: string;
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDTO): Promise<void>
    find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
}
