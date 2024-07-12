import { FinancialInformationDataSource } from "../../../domain/datasources/invoice/financialInformation.datasource";
import { RegisterFinancialInformationDto } from "../../../domain/dtos/invoice/register-financialInformation.dto";
import { UpdateFinancialInformationDto } from "../../../domain/dtos/invoice/update-financialInformation.dto";
import { FinancialInformationEntity } from "../../../domain/entities/invoice/financialInformation.entity";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { FinancialInformationRepository } from "../../../domain/repositories/invoice/financialInformation.repository";

export class FinancialInformationRepositoryImpl implements FinancialInformationRepository{
    constructor(
        private readonly financialInformationDataSource: FinancialInformationDataSource
    ){}

    createFinancialInformation(registerFinancialInformation: RegisterFinancialInformationDto, invoiceEntity: InvoiceEntity | null): Promise<FinancialInformationEntity> {
        return this.financialInformationDataSource.createFinancialInformation(registerFinancialInformation,invoiceEntity);
    }

    getFinancialInformationByInvoiceId(invoiceId: number): Promise<FinancialInformationEntity | null> {
        return this.financialInformationDataSource.getFinancialInformationByInvoiceId(invoiceId);
    }

    updateFinancialInformation(financialInformation: UpdateFinancialInformationDto, invoiceEntity: InvoiceEntity | null): Promise<FinancialInformationEntity> {
        return this.financialInformationDataSource.updateFinancialInformation(financialInformation,invoiceEntity);
    }
}