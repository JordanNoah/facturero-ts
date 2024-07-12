import { CreateInvoiceDataSource } from "../../../domain/datasources/invoice/createInvoice.datasource";
import { CreateInvoiceRepository } from "../../../domain/repositories/invoice/createInvoice.repository";

export class CreateInvoiceRepositoryImpl implements CreateInvoiceRepository {
    constructor(
        private readonly createInvoiceDataSource: CreateInvoiceDataSource
    ) {}

    createInvoice(): Promise<void> {
        return this.createInvoiceDataSource.createInvoice();
    }
}