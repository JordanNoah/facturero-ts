import { RegisterAdditionalInformationDto } from "../../dtos/invoice/additionalInfo/register-additionalInformation.dto";
import { UpdateAdditionalInfoDto } from "../../dtos/invoice/additionalInfo/update-additionalInformation.dto";
import { AdditionalInfoEntity } from "../../entities/invoice/additionalInfo.entity";
import { InvoiceEntity } from "../../entities/invoice/invoice.entity";

export abstract class AdditionalInfoDataSource {
    abstract createAdditionalInfo(registerAdditionalInformationDto:RegisterAdditionalInformationDto,invoiceEntity:InvoiceEntity|null): Promise<AdditionalInfoEntity>
    abstract getAdditionalInfoByInvoiceId(invoiceId:number): Promise<AdditionalInfoEntity[]>
    abstract updateAdditionalInfo(updateAdditionalInfoDto:UpdateAdditionalInfoDto): Promise<AdditionalInfoEntity>
    abstract deleteAdditionalInfoById(idAdditionalInfo:number): Promise<AdditionalInfoEntity>
    abstract getAdditionalInfoById(idAdditionalInfo:number): Promise<AdditionalInfoEntity | null>
    abstract getAdditionalInfoByUuid(uuid:string): Promise<AdditionalInfoEntity | null>
}