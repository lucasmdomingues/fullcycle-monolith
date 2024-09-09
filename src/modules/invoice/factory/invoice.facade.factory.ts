import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository()
        const findUsecase = new FindInvoiceUsecase(repository)

        const facade = new InvoiceFacade({
            findUsecase: findUsecase
        })
        return facade
    }
}
