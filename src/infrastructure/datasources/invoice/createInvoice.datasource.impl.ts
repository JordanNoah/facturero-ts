import { CreateInvoiceDataSource } from "../../../domain/datasources/invoice/createInvoice.datasource";

export class CreateInvoiceDataSourceImpl extends CreateInvoiceDataSource {
    createInvoice(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}