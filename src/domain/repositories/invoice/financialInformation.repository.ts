import { RegisterFinancialInformationDto } from "../../dtos/invoice/register-financialInformation.dto";
import { UpdateFinancialInformationDto } from "../../dtos/invoice/update-financialInformation.dto";
import { FinancialInformationEntity } from "../../entities/invoice/financialInformation.entity";
import { InvoiceEntity } from "../../entities/invoice/invoice.entity";

export abstract class FinancialInformationRepository {
    abstract createFinancialInformation(registerFinancialInformation:RegisterFinancialInformationDto,invoiceEntity:InvoiceEntity|null): Promise<FinancialInformationEntity>
    abstract getFinancialInformationByInvoiceId(invoiceId:number): Promise<FinancialInformationEntity|null>
    abstract updateFinancialInformation(financialInformation:UpdateFinancialInformationDto,invoiceEntity:InvoiceEntity|null): Promise<FinancialInformationEntity>
}