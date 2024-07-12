import { DetailTaxDataSource } from "../../../../domain/datasources/invoice/detail/detailTax.datasource";
import { RegisterDetailTaxDto } from "../../../../domain/dtos/invoice/detail/detailTax/register-detailTax.dto";
import { UpdateDetailTaxDto } from "../../../../domain/dtos/invoice/detail/detailTax/update-detailTax.dto";
import { DetailEntity } from "../../../../domain/entities/invoice/detail/detail.entity";
import { DetailTaxEntity } from "../../../../domain/entities/invoice/detail/detailTax.entity";
import { CustomError } from "../../../../domain/errors/custom.error";
import { DetailTaxSequelize } from "../../../database/models/invoice/detail/DetailTax";
import { DetailDataSourceImpl } from "./detail.datasource.impl";
import { v4 as uuidv4 } from "uuid"

export class DetailTaxDatasourceImpl implements DetailTaxDataSource {
    async createDetailTax(registerDetailTaxDto: RegisterDetailTaxDto, detailEntity: DetailEntity | null): Promise<DetailTaxEntity> {
        try{
            let detail: DetailEntity;
            if(!detailEntity){
                const detailDb = await new DetailDataSourceImpl().getDetailById(registerDetailTaxDto.detailId)
                if(!detailDb)throw CustomError.notFound('Detail not found')
                else detail = detailDb
            }else{
                detail = detailEntity
            }
            const {code,detailId,percentageCode,rate,taxableBase,value} = registerDetailTaxDto
            const detailTaxEntity = await DetailTaxSequelize.create({
                code: code,
                detailId: detail.id,
                percentageCode: percentageCode,
                rate: rate,
                taxableBase: taxableBase,
                value: value,
                uuid: uuidv4()
            })

            return new DetailTaxEntity(
                detailTaxEntity.id,
                detailTaxEntity.uuid,
                detailTaxEntity.detailId,
                detailTaxEntity.code,
                detailTaxEntity.percentageCode,
                detailTaxEntity.rate,
                detailTaxEntity.taxableBase,
                detailTaxEntity.value,
                detailTaxEntity.createdAt,
                detailTaxEntity.updatedAt,
                detailTaxEntity.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteDetailTaxByDetailId(detailId: number): Promise<DetailTaxEntity[]> {
        try{
            const detailTaxes = await this.getDetailTaxByDetailId(detailId)
            if(detailTaxes.length === 0) return []
            await DetailTaxSequelize.destroy({where:{detailId:detailId}})
            return detailTaxes
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteDetailTaxById(detailTaxId: number): Promise<DetailTaxEntity> {
        try{
            const detailTax = await this.getDetailTaxById(detailTaxId)
            if(!detailTax)throw CustomError.notFound('Detail Tax not found')
            await DetailTaxSequelize.destroy({where:{id:detailTax.id}})
            return detailTax
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getDetailTaxByDetailId(detailId: number): Promise<DetailTaxEntity[]> {
        try{
            const detailTaxes = await DetailTaxSequelize.findAll({where:{detailId:detailId}})
            if(detailTaxes.length === 0) return []
            return detailTaxes.map(detailTax => new DetailTaxEntity(
                detailTax.id,
                detailTax.uuid,
                detailTax.detailId,
                detailTax.code,
                detailTax.percentageCode,
                detailTax.rate,
                detailTax.taxableBase,
                detailTax.value,
                detailTax.createdAt,
                detailTax.updatedAt,
                detailTax.deletedAt
            ))
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getDetailTaxById(detailTaxId: number): Promise<DetailTaxEntity | null> {
        try{
            const detailTax = await DetailTaxSequelize.findByPk(detailTaxId)
            if(!detailTax) return null
            return new DetailTaxEntity(
                detailTax.id,
                detailTax.uuid,
                detailTax.detailId,
                detailTax.code,
                detailTax.percentageCode,
                detailTax.rate,
                detailTax.taxableBase,
                detailTax.value,
                detailTax.createdAt,
                detailTax.updatedAt,
                detailTax.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updateDetailTax(updateDetailTaxDto: UpdateDetailTaxDto, detailEntity: DetailEntity | null): Promise<DetailTaxEntity> {
        try{
            let detail: DetailEntity;
            if(!detailEntity){
                const detailDb = await new DetailDataSourceImpl().getDetailById(updateDetailTaxDto.detailId)
                if(!detailDb)throw CustomError.notFound('Detail not found')
                else detail = detailDb
            }else{
                detail = detailEntity
            }
            const detailTax = await this.getDetailTaxById(updateDetailTaxDto.id)
            if(!detailTax)throw CustomError.notFound('Detail Tax not found')
            const {code,detailId,id,percentageCode,rate,taxableBase,uuid,value} = updateDetailTaxDto
            detailTax.code = code
            detailTax.detailId = detail.id
            detailTax.percentageCode = percentageCode
            detailTax.rate = rate
            detailTax.taxableBase = taxableBase
            detailTax.value = value
            detailTax.uuid = uuid
            await DetailTaxSequelize.update({
                code: code,
                percentageCode: percentageCode,
                rate: rate,
                taxableBase: taxableBase,
                value: value,
                uuid: uuid
            },{where:{id:id}})
            return detailTax
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}