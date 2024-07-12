import { AdditionalInfoDataSource } from "../../../domain/datasources/invoice/additionalInfo.datasource";
import { RegisterAdditionalInformationDto } from "../../../domain/dtos/invoice/additionalInfo/register-additionalInformation.dto";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { AdditionalInfoSequelize } from "../../database/models/invoice/AdditionalInfo";
import { v4 as uuidv4 } from "uuid"
import { InvoiceDatasourceImpl } from "./invoice.datasource.impl";
import { AdditionalInfoEntity } from "../../../domain/entities/invoice/additionalInfo.entity";
import { UpdateAdditionalInfoDto } from "../../../domain/dtos/invoice/additionalInfo/update-additionalInformation.dto";

export class AdditionalInfoDataSourceImpl extends AdditionalInfoDataSource{
    async createAdditionalInfo(registerAdditionalInformationDto:RegisterAdditionalInformationDto,invoiceEntity:InvoiceEntity|null): Promise<AdditionalInfoEntity> {
        try{
            let invoice: InvoiceEntity;
            if(!invoiceEntity){
                let invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(registerAdditionalInformationDto.invoiceId);
                if(!invoiceDb) throw CustomError.notFound('Invoice not found');
                else invoice = invoiceDb;
            }else{
                invoice = invoiceEntity;
            }
            const {invoiceId,keyName,keyValue} = registerAdditionalInformationDto;
            const [additionalInfo,created] = await AdditionalInfoSequelize.findOrCreate({
                where:{
                    invoiceId:invoiceId,
                    keyName:keyName,
                    keyValue:keyValue
                },
                defaults:{
                    uuid:uuidv4(),
                    invoiceId:invoiceId,
                    keyName:keyName,
                    keyValue:keyValue
                }
            })

            return new AdditionalInfoEntity(
                additionalInfo.id,
                additionalInfo.uuid,
                additionalInfo.keyName,
                additionalInfo.keyValue,
                additionalInfo.invoiceId,
                additionalInfo.createdAt,
                additionalInfo.updatedAt,
                additionalInfo.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAdditionalInfoByInvoiceId(invoiceId: number): Promise<AdditionalInfoEntity[]> {
        try{
            const additionalInfo = await AdditionalInfoSequelize.findAll({
                where:{
                    invoiceId:invoiceId
                }
            })
            if(!additionalInfo) return [];
            return additionalInfo.map(additionalInfo => new AdditionalInfoEntity(
                additionalInfo.id,
                additionalInfo.uuid,
                additionalInfo.keyName,
                additionalInfo.keyValue,
                additionalInfo.invoiceId,
                additionalInfo.createdAt,
                additionalInfo.updatedAt,
                additionalInfo.deletedAt
            ))
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async updateAdditionalInfo(updateAdditionalInfoDto:UpdateAdditionalInfoDto): Promise<AdditionalInfoEntity> {
        try{
            const additionalInfo = await this.getAdditionalInfoByUuid(updateAdditionalInfoDto.uuid);
            if(!additionalInfo) throw CustomError.notFound('AdditionalInfo not found');
            const {keyName,keyValue} = updateAdditionalInfoDto;
            additionalInfo.keyName = keyName;
            additionalInfo.keyValue = keyValue;
            await AdditionalInfoSequelize.update({
                keyName:keyName,
                keyValue:keyValue
            },{
                where:{id:additionalInfo.id}
            })
            return additionalInfo;
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteAdditionalInfoById(idAdditionalInfo: number): Promise<AdditionalInfoEntity> {
        try{
            const additionalInfo = await this.getAdditionalInfoById(idAdditionalInfo);
            if(!additionalInfo) throw CustomError.notFound('AdditionalInfo not found');
            await AdditionalInfoSequelize.destroy({
                where:{id:additionalInfo.id}
            })
            return additionalInfo;
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getAdditionalInfoById(idAdditionalInfo: number): Promise<AdditionalInfoEntity | null> {
        try{
            const additionalInfo = await AdditionalInfoSequelize.findByPk(idAdditionalInfo);
            if(!additionalInfo) return null;
            return new AdditionalInfoEntity(
                additionalInfo.id,
                additionalInfo.uuid,
                additionalInfo.keyName,
                additionalInfo.keyValue,
                additionalInfo.invoiceId,
                additionalInfo.createdAt,
                additionalInfo.updatedAt,
                additionalInfo.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getAdditionalInfoByUuid(uuid: string): Promise<AdditionalInfoEntity | null> {
        try{
            const additionalInfo = await AdditionalInfoSequelize.findOne({
                where:{uuid:uuid}
            })
            if (!additionalInfo) {
                return null;
            }
            return new AdditionalInfoEntity(
                additionalInfo.id,
                additionalInfo.uuid,
                additionalInfo.keyName,
                additionalInfo.keyValue,
                additionalInfo.invoiceId,
                additionalInfo.createdAt,
                additionalInfo.updatedAt,
                additionalInfo.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}