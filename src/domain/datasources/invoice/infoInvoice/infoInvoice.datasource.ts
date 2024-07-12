import { RegisterInfoInvoiceDto } from "../../../dtos/invoice/infoInvoice/register-infoInvoice.dto";
import { UpdateInfoInvoiceDto } from "../../../dtos/invoice/infoInvoice/update-infoInvoice.dto";
import { InfoInvoiceEntity } from "../../../entities/invoice/infoInvoice/infoInvoice.entity";

export abstract class InfoInvoiceDatasource {
    abstract getInfoInvoiceByInvoiceId(invoiceId: number): Promise<InfoInvoiceEntity | null>;
    abstract getInfoInvoiceByUuid(uuid: string): Promise<InfoInvoiceEntity | null>;
    abstract getInfoInvoiceById(infoInvoiceId: number): Promise<InfoInvoiceEntity | null>;
    abstract createInfoInvoice(registerInfoInvoiceDto:RegisterInfoInvoiceDto,infoInvoiceEntity:InfoInvoiceEntity|null): Promise<InfoInvoiceEntity>;
    abstract updateInfoInvoice(updateInfoInvoiceDto:UpdateInfoInvoiceDto): Promise<InfoInvoiceEntity>;
    abstract deleteInfoInvoice(infoInvoiceId:number): Promise<InfoInvoiceEntity>;
}