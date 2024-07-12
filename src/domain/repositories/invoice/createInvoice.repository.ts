export abstract class CreateInvoiceRepository {
    abstract createInvoice(): Promise<void>
}