import { RegisterAdditionalInformationDto } from "../../dtos/invoice/additionalInfo/register-additionalInformation.dto";
import { UpdateAdditionalInfoDto } from "../../dtos/invoice/additionalInfo/update-additionalInformation.dto";
import { AdditionalInfoEntity } from "../../entities/invoice/additionalInfo.entity";
import { InvoiceEntity } from "../../entities/invoice/invoice.entity";

export abstract class AdditionalInformationRepository {
    abstract createAdditionalInformation(registerAdditionalInformationDto:RegisterAdditionalInformationDto,invoiceEntity:InvoiceEntity|null): Promise<AdditionalInfoEntity>
    abstract getAdditionalInformationByInvoiceId(invoiceId:number): Promise<AdditionalInfoEntity[]>
    abstract updateAdditionalInformation(updateAdditionalInformationDto:UpdateAdditionalInfoDto): Promise<AdditionalInfoEntity>
    abstract deleteAdditionalInformationById(idAdditionalInformation:number): Promise<AdditionalInfoEntity>
    abstract getAdditionalInformationById(idAdditionalInformation:number): Promise<AdditionalInfoEntity | null>
    abstract getAdditionalInformationByUuid(uuid:string): Promise<AdditionalInfoEntity | null>
}