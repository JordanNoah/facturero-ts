import { InvoiceDataSource } from "../../../domain/datasources/invoice/invoice.datasource";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { InvoiceRepository } from "../../../domain/repositories/invoice/invoice.repository";

export class InvoiceRepositoryImpl implements InvoiceRepository{

    constructor(
        private readonly invoiceDatasource: InvoiceDataSource
    ){}

    async createInvoice(): Promise<InvoiceEntity> {
        return this.invoiceDatasource.createInvoice();
    }

    async deleteInvoice(id: number): Promise<InvoiceEntity> {
        return this.invoiceDatasource.deleteInvoice(id);
    }

    async getInvoiceByUuid(uuid: string): Promise<InvoiceEntity | null> {
        return this.invoiceDatasource.getInvoiceByUuid(uuid);
    }

    async getInvoiceById(id: number): Promise<InvoiceEntity | null> {
        return this.invoiceDatasource.getInvoiceById(id);
    }

    async getInvoices(): Promise<InvoiceEntity[]> {
        return this.invoiceDatasource.getInvoices();
    }

    async updateInvoice(): Promise<void> {
        return this.invoiceDatasource.updateInvoice();
    }

    async registerInvoice(): Promise<InvoiceEntity> {
        return this.invoiceDatasource.registerInvoice();
    }
}