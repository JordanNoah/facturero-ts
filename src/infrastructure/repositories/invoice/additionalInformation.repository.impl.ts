import { AdditionalInfoDataSource } from "../../../domain/datasources/invoice/additionalInfo.datasource";
import { RegisterAdditionalInformationDto } from "../../../domain/dtos/invoice/additionalInfo/register-additionalInformation.dto";
import { UpdateAdditionalInfoDto } from "../../../domain/dtos/invoice/additionalInfo/update-additionalInformation.dto";
import { AdditionalInfoEntity } from "../../../domain/entities/invoice/additionalInfo.entity";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { AdditionalInformationRepository } from "../../../domain/repositories/invoice/additionalInformation.repository";

export class AdditionalInformationRepositoryImpl implements AdditionalInformationRepository {
    constructor(
        private readonly additionalInformationDataSource: AdditionalInfoDataSource
    ) {}

    createAdditionalInformation(registerAdditionalInformationDto: RegisterAdditionalInformationDto, invoiceEntity: InvoiceEntity | null): Promise<AdditionalInfoEntity> {
        return this.additionalInformationDataSource.createAdditionalInfo(registerAdditionalInformationDto, invoiceEntity);
    }
    deleteAdditionalInformationById(idAdditionalInformation: number): Promise<AdditionalInfoEntity> {
        return this.additionalInformationDataSource.deleteAdditionalInfoById(idAdditionalInformation);
    }
    getAdditionalInformationById(idAdditionalInformation: number): Promise<AdditionalInfoEntity | null> {
        return this.additionalInformationDataSource.getAdditionalInfoById(idAdditionalInformation);
    }
    getAdditionalInformationByInvoiceId(invoiceId: number): Promise<AdditionalInfoEntity[]> {
        return this.additionalInformationDataSource.getAdditionalInfoByInvoiceId(invoiceId);       
    }
    getAdditionalInformationByUuid(uuid: string): Promise<AdditionalInfoEntity | null> {
        return this.additionalInformationDataSource.getAdditionalInfoByUuid(uuid);
    }
    updateAdditionalInformation(updateAdditionalInformationDto: UpdateAdditionalInfoDto): Promise<AdditionalInfoEntity> {
        return this.additionalInformationDataSource.updateAdditionalInfo(updateAdditionalInformationDto);
    }
}