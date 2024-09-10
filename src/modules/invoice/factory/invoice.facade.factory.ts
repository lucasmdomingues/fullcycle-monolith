import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find.usecase";
import GenerateInvoiceUsecase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository()
        const findUsecase = new FindInvoiceUsecase(repository)
        const generateUsecase = new GenerateInvoiceUsecase(repository)

        const facade = new InvoiceFacade({
            findUsecase: findUsecase,
            generateUsecase: generateUsecase
        })

        return facade
    }
}
