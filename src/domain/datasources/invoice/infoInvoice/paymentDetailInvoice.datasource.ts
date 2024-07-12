import { RegisterPaymentDetailInvoiceDto } from "../../../dtos/invoice/infoInvoice/paymentDetailInvoice/register-paymentDetailInvoice.dto";
import { UpdatePaymentDetailInvoiceDto } from "../../../dtos/invoice/infoInvoice/paymentDetailInvoice/update-paymentDetailInvoice.dto";
import { InfoInvoiceEntity } from "../../../entities/invoice/infoInvoice/infoInvoice.entity";
import { PaymentDetailInvoiceEntity } from "../../../entities/invoice/infoInvoice/paymentDetailInvoice.entity";

export abstract class PaymentDetailInvoiceDatasource {
    abstract createPaymentDetailInvoice(registerPaymentDetailInvoiceDto:RegisterPaymentDetailInvoiceDto, infoInvoiceEntity: InfoInvoiceEntity | null): Promise<PaymentDetailInvoiceEntity>
    abstract getPaymentDetailInvoice(detailInvoiceIdid:number): Promise<PaymentDetailInvoiceEntity[]>
    abstract updatePaymentDetailInvoice(updatePaymentDetailInvoiceDto:UpdatePaymentDetailInvoiceDto): Promise<PaymentDetailInvoiceEntity>
    abstract deletePaymentDetailInvoice(id:number): Promise<PaymentDetailInvoiceEntity>
    abstract getPaymentDetailInvoiceById(id:number): Promise<PaymentDetailInvoiceEntity | null>
    abstract getPaymentDetailInvoiceByUuid(uuid:string): Promise<PaymentDetailInvoiceEntity | null>
}