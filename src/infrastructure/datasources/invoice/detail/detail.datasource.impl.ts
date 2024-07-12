import { DetailDataSource } from "../../../../domain/datasources/invoice/detail/detail.datasource";
import { RegisterDetailDto } from "../../../../domain/dtos/invoice/detail/register-detail.dto";
import { UpdateDetailDto } from "../../../../domain/dtos/invoice/detail/update-detail.dto";
import { DetailEntity } from "../../../../domain/entities/invoice/detail/detail.entity";
import { InvoiceEntity } from "../../../../domain/entities/invoice/invoice.entity";
import { CustomError } from "../../../../domain/errors/custom.error";
import { DetailSequelize } from "../../../database/models/invoice/detail/Detail";
import { InvoiceDatasourceImpl } from "../invoice.datasource.impl";
import { v4 as uuidv4 } from "uuid"

export class DetailDataSourceImpl implements DetailDataSource {
    async createDetail(registerDetailDto: RegisterDetailDto,invoiceEntity:InvoiceEntity | null): Promise<DetailEntity> {
        try{
            let invoice: InvoiceEntity;
            if(!invoiceEntity){
                const invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(registerDetailDto.invoiceId)
                if(!invoiceDb)throw CustomError.notFound('Invoice not found')
                else invoice = invoiceDb
            }else{
                invoice = invoiceEntity
            }

            const {auxiliaryCode,description,discount,invoiceId,mainCode,quantity,totalWithoutTaxes,unitPrice} = registerDetailDto
            const detailEntity = await DetailSequelize.create({
                auxiliaryCode: auxiliaryCode,
                description: description,
                discount: discount,
                invoiceId: invoiceId,
                mainCode: mainCode,
                quantity: quantity,
                totalWithoutTaxes: totalWithoutTaxes,
                unitPrice: unitPrice,
                uuid: uuidv4()
            })

            return new DetailEntity(
                detailEntity.id,
                detailEntity.uuid,
                detailEntity.invoiceId,
                detailEntity.mainCode,
                detailEntity.auxiliaryCode,
                detailEntity.description,
                detailEntity.quantity,
                detailEntity.unitPrice,
                detailEntity.discount,
                detailEntity.totalWithoutTaxes,
                detailEntity.createdAt,
                detailEntity.updatedAt,
                detailEntity.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteDetailById(detailId: number): Promise<DetailEntity> {
        try{
            const detail = await this.getDetailById(detailId)
            if(!detail)throw CustomError.notFound('Detail not found')
            await DetailSequelize.destroy({where:{id:detailId}})
            return detail
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getDetailById(detailId: number): Promise<DetailEntity | null> {
        try{
            const detail = await DetailSequelize.findByPk(detailId)
            if(!detail) return null
            return new DetailEntity(
                detail.id,
                detail.uuid,
                detail.invoiceId,
                detail.mainCode,
                detail.auxiliaryCode,
                detail.description,
                detail.quantity,
                detail.unitPrice,
                detail.discount,
                detail.totalWithoutTaxes,
                detail.createdAt,
                detail.updatedAt,
                detail.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getDetailByUuid(detailUuid: string): Promise<DetailEntity | null> {
        try{
            const detail = await DetailSequelize.findOne({where:{uuid:detailUuid}})
            if(!detail) return null
            return new DetailEntity(
                detail.id,
                detail.uuid,
                detail.invoiceId,
                detail.mainCode,
                detail.auxiliaryCode,
                detail.description,
                detail.quantity,
                detail.unitPrice,
                detail.discount,
                detail.totalWithoutTaxes,
                detail.createdAt,
                detail.updatedAt,
                detail.deletedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getDetailsByInvoiceId(invoiceId: number): Promise<DetailEntity[]> {
        try{
            const details = await DetailSequelize.findAll({where:{invoiceId:invoiceId}})
            if(!details) return []
            return details.map(detail => new DetailEntity(
                detail.id,
                detail.uuid,
                detail.invoiceId,
                detail.mainCode,
                detail.auxiliaryCode,
                detail.description,
                detail.quantity,
                detail.unitPrice,
                detail.discount,
                detail.totalWithoutTaxes,
                detail.createdAt,
                detail.updatedAt,
                detail.deletedAt
            ))
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updateDetail(updateInfoInvoiceDto: UpdateDetailDto, invoiceEntity:InvoiceEntity | null): Promise<DetailEntity> {
        try{
            let invoice: InvoiceEntity;
            if(!invoiceEntity){
                const invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(updateInfoInvoiceDto.invoiceId)
                if(!invoiceDb)throw CustomError.notFound('Invoice not found')
                else invoice = invoiceDb
            }else{
                invoice = invoiceEntity
            }
            let detail = await this.getDetailById(updateInfoInvoiceDto.id)
            if(!detail)throw CustomError.notFound('Detail not found')
            const {auxiliaryCode,description,discount,mainCode,quantity,totalWithoutTaxes,unitPrice,id,invoiceId,uuid} = updateInfoInvoiceDto
            detail.auxiliaryCode = auxiliaryCode
            detail.description = description
            detail.discount = discount
            detail.mainCode = mainCode
            detail.quantity = quantity
            detail.totalWithoutTaxes = totalWithoutTaxes
            detail.unitPrice = unitPrice

            await DetailSequelize.update({
                auxiliaryCode: auxiliaryCode,
                description: description,
                discount: discount,
                mainCode: mainCode,
                quantity: quantity,
                totalWithoutTaxes: totalWithoutTaxes,
                unitPrice: unitPrice,
                invoiceId: invoiceId
            },{where:{id:id}})

            return detail
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}