import { ToltalTaxDetailInvoiceDataSource } from "../../../../domain/datasources/invoice/infoInvoice/totalTaxDetailInvoice.datasource";
import { RegisterTotalTaxDetailInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/totalTaxDetailInvoice/register-totalTaxDetailInvoice.dto";
import { UpdateTotalTaxDetailInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/totalTaxDetailInvoice/update-totalTaxDetailInvoice.dto";
import { InfoInvoiceEntity } from "../../../../domain/entities/invoice/infoInvoice/infoInvoice.entity";
import { TotalTaxDetailInvoiceEntity } from "../../../../domain/entities/invoice/infoInvoice/totalTaxDetailInvoice.entity";
import { InvoiceEntity } from "../../../../domain/entities/invoice/invoice.entity";
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../../../../domain/errors/custom.error";
import { TotalTaxDetailInvoiceSequelize } from "../../../database/models/invoice/InfoInvoice/TotalTaxDetailInvoice";
import { InfoInvoiceDatasourceImpl } from "./infoInvoice.datasource.impl";

export class TotalTaxDetailInvoiceDataSourceImpl extends ToltalTaxDetailInvoiceDataSource {
    async createTotalTaxDetailInvoice(registerTotalTaxDetailInvoiceDto: RegisterTotalTaxDetailInvoiceDto, infoInvoiceEntity: InfoInvoiceEntity | null): Promise<TotalTaxDetailInvoiceEntity> {
        try {
            let infoInvoice: InfoInvoiceEntity;
            if(!infoInvoiceEntity){
                let infoInvoiceDb = await new InfoInvoiceDatasourceImpl().getInfoInvoiceById(registerTotalTaxDetailInvoiceDto.detailInvoiceId);
                if(!infoInvoiceDb) throw CustomError.notFound('InfoInvoice not found');
                else infoInvoice = infoInvoiceDb;
            }else{
                infoInvoice = infoInvoiceEntity;
            }

            const totalTaxDetailInvoiceSequelize = await TotalTaxDetailInvoiceSequelize.create({
                uuid:uuidv4(),
                code:registerTotalTaxDetailInvoiceDto.code,
                percentageCode:registerTotalTaxDetailInvoiceDto.percentageCode,
                taxableBase:registerTotalTaxDetailInvoiceDto.taxableBase,
                value:registerTotalTaxDetailInvoiceDto.value,
                detailInvoiceId:infoInvoice.id
            });
            
            return new TotalTaxDetailInvoiceEntity(
                totalTaxDetailInvoiceSequelize.id,
                totalTaxDetailInvoiceSequelize.uuid,
                totalTaxDetailInvoiceSequelize.code,
                totalTaxDetailInvoiceSequelize.percentageCode,
                totalTaxDetailInvoiceSequelize.taxableBase,
                totalTaxDetailInvoiceSequelize.value,
                totalTaxDetailInvoiceSequelize.detailInvoiceId,
                totalTaxDetailInvoiceSequelize.createdAt,
                totalTaxDetailInvoiceSequelize.updatedAt,
                totalTaxDetailInvoiceSequelize.deletedAt
            );
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteTotalTaxDetailInvoiceById(idTotalTaxDetailInvoice: number): Promise<TotalTaxDetailInvoiceEntity> {
        try {
            const totalTaxDetailInvoiceSequelize = await this.getTotalTaxDetailInvoiceById(idTotalTaxDetailInvoice);
            if(!totalTaxDetailInvoiceSequelize) throw CustomError.notFound('TotalTaxDetailInvoice not found');
            await TotalTaxDetailInvoiceSequelize.destroy({where:{id:totalTaxDetailInvoiceSequelize.id}});
            return totalTaxDetailInvoiceSequelize;
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalTaxDetailInvoiceById(idTotalTaxDetailInvoice: number): Promise<TotalTaxDetailInvoiceEntity | null> {
        try {
            const totalTaxDetailInvoice = await TotalTaxDetailInvoiceSequelize.findOne({where:{id:idTotalTaxDetailInvoice}});
            if(!totalTaxDetailInvoice) return null;
            return new TotalTaxDetailInvoiceEntity(
                totalTaxDetailInvoice.id,
                totalTaxDetailInvoice.uuid,
                totalTaxDetailInvoice.code,
                totalTaxDetailInvoice.percentageCode,
                totalTaxDetailInvoice.taxableBase,
                totalTaxDetailInvoice.value,
                totalTaxDetailInvoice.detailInvoiceId,
                totalTaxDetailInvoice.createdAt,
                totalTaxDetailInvoice.updatedAt,
                totalTaxDetailInvoice.deletedAt
            )
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalTaxDetailInvoiceByUuid(uuid: string): Promise<TotalTaxDetailInvoiceEntity | null> {
        try {
            const totalTaxDetailInvoice = await TotalTaxDetailInvoiceSequelize.findOne({where:{uuid:uuid}});
            if(!totalTaxDetailInvoice) return null;
            return new TotalTaxDetailInvoiceEntity(
                totalTaxDetailInvoice.id,
                totalTaxDetailInvoice.uuid,
                totalTaxDetailInvoice.code,
                totalTaxDetailInvoice.percentageCode,
                totalTaxDetailInvoice.taxableBase,
                totalTaxDetailInvoice.value,
                totalTaxDetailInvoice.detailInvoiceId,
                totalTaxDetailInvoice.createdAt,
                totalTaxDetailInvoice.updatedAt,
                totalTaxDetailInvoice.deletedAt
            )
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalTaxDetailsByInvoiceId(detailInvoiceId: number): Promise<TotalTaxDetailInvoiceEntity[]> {
        try {
            const totalTaxDetailsInvoice = await TotalTaxDetailInvoiceSequelize.findAll({where:{detailInvoiceId:detailInvoiceId}});
            if(totalTaxDetailsInvoice.length == 0) return [];
            return totalTaxDetailsInvoice.map(totalTaxDetailInvoice => {
                return new TotalTaxDetailInvoiceEntity(
                    totalTaxDetailInvoice.id,
                    totalTaxDetailInvoice.uuid,
                    totalTaxDetailInvoice.code,
                    totalTaxDetailInvoice.percentageCode,
                    totalTaxDetailInvoice.taxableBase,
                    totalTaxDetailInvoice.value,
                    totalTaxDetailInvoice.detailInvoiceId,
                    totalTaxDetailInvoice.createdAt,
                    totalTaxDetailInvoice.updatedAt,
                    totalTaxDetailInvoice.deletedAt
                )
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async updateTotalTaxDetailInvoice(updateTotalTaxDetailInvoiceDto: UpdateTotalTaxDetailInvoiceDto): Promise<TotalTaxDetailInvoiceEntity> {
        try {
            const totalTaxDetailInvoiceSequelize = await TotalTaxDetailInvoiceSequelize.findOne({where:{id:updateTotalTaxDetailInvoiceDto.id}});
            if(!totalTaxDetailInvoiceSequelize) throw CustomError.notFound('TotalTaxDetailInvoice not found');
            totalTaxDetailInvoiceSequelize.code = updateTotalTaxDetailInvoiceDto.code;
            totalTaxDetailInvoiceSequelize.percentageCode = updateTotalTaxDetailInvoiceDto.percentageCode;
            totalTaxDetailInvoiceSequelize.taxableBase = updateTotalTaxDetailInvoiceDto.taxableBase;
            totalTaxDetailInvoiceSequelize.value = updateTotalTaxDetailInvoiceDto.value;
            await totalTaxDetailInvoiceSequelize.save();
            return new TotalTaxDetailInvoiceEntity(
                totalTaxDetailInvoiceSequelize.id,
                totalTaxDetailInvoiceSequelize.uuid,
                totalTaxDetailInvoiceSequelize.code,
                totalTaxDetailInvoiceSequelize.percentageCode,
                totalTaxDetailInvoiceSequelize.taxableBase,
                totalTaxDetailInvoiceSequelize.value,
                totalTaxDetailInvoiceSequelize.detailInvoiceId,
                totalTaxDetailInvoiceSequelize.createdAt,
                totalTaxDetailInvoiceSequelize.updatedAt,
                totalTaxDetailInvoiceSequelize.deletedAt
            );
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}