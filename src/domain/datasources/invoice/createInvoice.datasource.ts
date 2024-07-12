export abstract class CreateInvoiceDataSource {
    abstract createInvoice(): Promise<void>
}