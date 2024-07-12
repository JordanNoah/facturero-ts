import { InvoiceEntity } from "../../entities/invoice/invoice.entity";

export abstract class InvoiceDataSource {
    abstract createInvoice(): Promise<InvoiceEntity>
    abstract registerInvoice(): Promise<InvoiceEntity>
    abstract updateInvoice(): Promise<void>
    abstract deleteInvoice(id: number): Promise<InvoiceEntity>
    abstract getInvoiceById(id: number): Promise<InvoiceEntity | null>
    abstract getInvoiceByUuid(uuid: string): Promise<InvoiceEntity | null>
    abstract getInvoices(): Promise<InvoiceEntity[]>
}