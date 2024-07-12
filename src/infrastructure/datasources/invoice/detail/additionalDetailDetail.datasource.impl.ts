import { AdditionalDetailDetailDataSource } from "../../../../domain/datasources/invoice/detail/additionalDetailDetail.datasource";
import { RegisterAdditionalDetailDetailDto } from "../../../../domain/dtos/invoice/detail/additionalDetailDetail/register-additionalDetailDetail.dto";
import { UpdateAdditionalDetailDetailDto } from "../../../../domain/dtos/invoice/detail/additionalDetailDetail/update-additionaDetailDetail.dto";
import { AdditionalDetailDetailEntity } from "../../../../domain/entities/invoice/detail/additionalDetailDetail.entity";
import { DetailEntity } from "../../../../domain/entities/invoice/detail/detail.entity";
import { v4 as uuidv4 } from "uuid"
import { DetailDataSourceImpl } from "./detail.datasource.impl";
import { AdditionalDetailSequelize } from "../../../database/models/invoice/detail/AdditionalDetailDetail";
import { CustomError } from "../../../../domain/errors/custom.error";

export class AdditionalDetailDetailDataSourceImpl implements AdditionalDetailDetailDataSource {
    async createAdditionalDetailDetail(registerAdditionalDetailDetailDto: RegisterAdditionalDetailDetailDto, detailEntity: DetailEntity | null): Promise<AdditionalDetailDetailEntity> {
        try{
            let detail: DetailEntity;
        if(!detailEntity){
            const detailDb = await new DetailDataSourceImpl().getDetailById(registerAdditionalDetailDetailDto.detailId)
            if(!detailDb)throw new Error("Detail not found")
            else detail = detailDb
        }else{
            detail = detailEntity
        }
        const {detailId,keyName,valueData} = registerAdditionalDetailDetailDto
        const additionalDetailDetailEntity = await AdditionalDetailSequelize.create({
            detailId: detailId,
            keyName: keyName,
            valueData: valueData,
            uuid: uuidv4()
        })
        return new AdditionalDetailDetailEntity(
            additionalDetailDetailEntity.id,
            additionalDetailDetailEntity.uuid,
            additionalDetailDetailEntity.detailId,
            additionalDetailDetailEntity.keyName,
            additionalDetailDetailEntity.valueData,
            additionalDetailDetailEntity.createdAt,
            additionalDetailDetailEntity.updatedAt,
            additionalDetailDetailEntity.deletedAt
        )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteAdditionalDetailDetailByAdditionalDetailId(additionalDetailId:number): Promise<AdditionalDetailDetailEntity[]>{
        try{
            const additionalDetailDetails = await this.getAdditionalDetailDetailByAdditionalDetailId(additionalDetailId)
            if(!additionalDetailDetails) throw CustomError.notFound('Additional Detail Detail not found')
            await AdditionalDetailSequelize.destroy({
                where:{
                    detailId: additionalDetailId
                }
            })
            return additionalDetailDetails
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteAdditionalDetailDetailById(additionalDetailDetailId: number): Promise<AdditionalDetailDetailEntity>{
        try{
            const additionalDetailDetail = await this.getAdditionalDetailDetailById(additionalDetailDetailId)
            if(!additionalDetailDetail) throw CustomError.notFound('Additional Detail Detail not found')
            await AdditionalDetailSequelize.destroy({
                where:{
                    id: additionalDetailDetailId
                }
            })
            return additionalDetailDetail
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAdditionalDetailDetailByAdditionalDetailId(additionalDetailId: number): Promise<AdditionalDetailDetailEntity[]> {
        try{
            const additionalDetailDetails = await AdditionalDetailSequelize.findAll({
                where:{
                    detailId: additionalDetailId
                }
            })
            if(!additionalDetailDetails) return[]
            return additionalDetailDetails.map(additionalDetailDetail => new AdditionalDetailDetailEntity(
                additionalDetailDetail.id,
                additionalDetailDetail.uuid,
                additionalDetailDetail.detailId,
                additionalDetailDetail.keyName,
                additionalDetailDetail.valueData,
                additionalDetailDetail.createdAt,
                additionalDetailDetail.updatedAt,
                additionalDetailDetail.deletedAt
            ))
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAdditionalDetailDetailById(additionalDetailDetailId: number): Promise<AdditionalDetailDetailEntity | null>{
        try{
            const additionalDetailDetail = await AdditionalDetailSequelize.findByPk(additionalDetailDetailId)
            if(!additionalDetailDetail) return null
            return new AdditionalDetailDetailEntity(
                additionalDetailDetail.id,
                additionalDetailDetail.uuid,
                additionalDetailDetail.detailId,
                additionalDetailDetail.keyName,
                additionalDetailDetail.valueData,
                additionalDetailDetail.createdAt,
                additionalDetailDetail.updatedAt,
                additionalDetailDetail.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updateAdditionalDetailDetailById(updateAdditionalDetailDetailDto: UpdateAdditionalDetailDetailDto): Promise<AdditionalDetailDetailEntity> {
        try{
            const additionalDetailDetail = await this.getAdditionalDetailDetailById(updateAdditionalDetailDetailDto.id)
            if(!additionalDetailDetail) throw CustomError.notFound('Additional Detail Detail not found')
            await AdditionalDetailSequelize.update({
                keyName: updateAdditionalDetailDetailDto.keyName,
                valueData: updateAdditionalDetailDetailDto.valueData
            },{
                where:{
                    id: updateAdditionalDetailDetailDto.id
                }
            })
            return new AdditionalDetailDetailEntity(
                additionalDetailDetail.id,
                additionalDetailDetail.uuid,
                additionalDetailDetail.detailId,
                updateAdditionalDetailDetailDto.keyName,
                updateAdditionalDetailDetailDto.valueData,
                additionalDetailDetail.createdAt,
                additionalDetailDetail.updatedAt,
                additionalDetailDetail.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}