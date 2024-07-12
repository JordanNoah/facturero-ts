import { RegisterTotalTaxDetailInvoiceDto } from "../../../dtos/invoice/infoInvoice/totalTaxDetailInvoice/register-totalTaxDetailInvoice.dto";
import { UpdateTotalTaxDetailInvoiceDto } from "../../../dtos/invoice/infoInvoice/totalTaxDetailInvoice/update-totalTaxDetailInvoice.dto";
import { InfoInvoiceEntity } from "../../../entities/invoice/infoInvoice/infoInvoice.entity";
import { TotalTaxDetailInvoiceEntity } from "../../../entities/invoice/infoInvoice/totalTaxDetailInvoice.entity";

export abstract class ToltalTaxDetailInvoiceDataSource {
    abstract createTotalTaxDetailInvoice(registerTotalTaxDetailInvoiceDto:RegisterTotalTaxDetailInvoiceDto,infoInvoiceEntity:InfoInvoiceEntity|null): Promise<TotalTaxDetailInvoiceEntity>
    abstract getTotalTaxDetailsByInvoiceId(detailInvoiceId:number): Promise<TotalTaxDetailInvoiceEntity[]>
    abstract updateTotalTaxDetailInvoice(updateTotalTaxDetailInvoiceDto:UpdateTotalTaxDetailInvoiceDto): Promise<TotalTaxDetailInvoiceEntity>
    abstract deleteTotalTaxDetailInvoiceById(idTotalTaxDetailInvoice:number): Promise<TotalTaxDetailInvoiceEntity>
    abstract getTotalTaxDetailInvoiceById(idTotalTaxDetailInvoice:number): Promise<TotalTaxDetailInvoiceEntity | null>
    abstract getTotalTaxDetailInvoiceByUuid(uuid:string): Promise<TotalTaxDetailInvoiceEntity | null>
}