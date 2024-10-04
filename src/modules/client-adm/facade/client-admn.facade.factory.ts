import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacade {
        const repository = new ClientRepository();
        const findUsecase = new FindClientUsecase(repository)
        const addUsecase = new AddClientUsecase(repository)
        const facade = new ClientAdmFacade({
            findUsecase: findUsecase,
            addUsecase: addUsecase
        })

        return facade
    }
}
