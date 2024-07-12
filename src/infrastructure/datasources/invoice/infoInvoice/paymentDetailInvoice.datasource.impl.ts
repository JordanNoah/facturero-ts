import { PaymentDetailInvoiceDatasource } from "../../../../domain/datasources/invoice/infoInvoice/paymentDetailInvoice.datasource";
import { RegisterPaymentDetailInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/paymentDetailInvoice/register-paymentDetailInvoice.dto";
import { UpdatePaymentDetailInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/paymentDetailInvoice/update-paymentDetailInvoice.dto";
import { InfoInvoiceEntity } from "../../../../domain/entities/invoice/infoInvoice/infoInvoice.entity";
import { PaymentDetailInvoiceEntity } from "../../../../domain/entities/invoice/infoInvoice/paymentDetailInvoice.entity";
import { CustomError } from "../../../../domain/errors/custom.error";
import { PaymentDetailInvoiceSequelize } from "../../../database/models/invoice/InfoInvoice/PaymentDetailInvoice";
import { InfoInvoiceDatasourceImpl } from "./infoInvoice.datasource.impl";
import { v4 as uuidv4 } from "uuid";

export class PaymentDetailInvoiceDatasourceImpl extends PaymentDetailInvoiceDatasource {
    async createPaymentDetailInvoice(registerPaymentDetailInvoiceDto: RegisterPaymentDetailInvoiceDto, infoInvoiceEntity: InfoInvoiceEntity): Promise<PaymentDetailInvoiceEntity> {
        try{
            let infoInvoice: InfoInvoiceEntity;
            if (!infoInvoiceEntity) {
                const infoInvoiceDb = await new InfoInvoiceDatasourceImpl().getInfoInvoiceById(registerPaymentDetailInvoiceDto.detailInvoiceId);
                if (!infoInvoiceDb) throw CustomError.notFound('InfoInvoice not found');
                else infoInvoice = infoInvoiceDb;
            }else{
                infoInvoice = infoInvoiceEntity;
            }

            const paymentDetailInvoiceSequelize = await PaymentDetailInvoiceSequelize.create({
                detailInvoiceId: infoInvoice.id,
                paymentMethod: registerPaymentDetailInvoiceDto.paymentMethod,
                term: registerPaymentDetailInvoiceDto.term,
                timeUnit: registerPaymentDetailInvoiceDto.timeUnit,
                totalAmount: registerPaymentDetailInvoiceDto.totalAmount,
                uuid: uuidv4()
            });

            return new PaymentDetailInvoiceEntity(
                paymentDetailInvoiceSequelize.id,
                paymentDetailInvoiceSequelize.uuid,
                paymentDetailInvoiceSequelize.paymentMethod,
                paymentDetailInvoiceSequelize.totalAmount,
                paymentDetailInvoiceSequelize.term,
                paymentDetailInvoiceSequelize.timeUnit,
                paymentDetailInvoiceSequelize.detailInvoiceId,
                paymentDetailInvoiceSequelize.createdAt,
                paymentDetailInvoiceSequelize.updatedAt,
                paymentDetailInvoiceSequelize.deletedAt
            );
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deletePaymentDetailInvoice(id: number): Promise<PaymentDetailInvoiceEntity> {
        try{
            const paymentDetailInvoice = await this.getPaymentDetailInvoiceById(id);
            if(!paymentDetailInvoice) throw CustomError.notFound('PaymentDetailInvoice not found');
            await PaymentDetailInvoiceSequelize.destroy({where:{id:paymentDetailInvoice.id}});
            return paymentDetailInvoice;
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getPaymentDetailInvoice(detailInvoiceIdid: number): Promise<PaymentDetailInvoiceEntity[]> {
        try{
            const paymentsDetailInvoice = await PaymentDetailInvoiceSequelize.findAll({
                where:{detailInvoiceId:detailInvoiceIdid}
            });
            if(!paymentsDetailInvoice) return [];
            return paymentsDetailInvoice.map(paymentDetailInvoice => new PaymentDetailInvoiceEntity(
                paymentDetailInvoice.id,
                paymentDetailInvoice.uuid,
                paymentDetailInvoice.paymentMethod,
                paymentDetailInvoice.totalAmount,
                paymentDetailInvoice.term,
                paymentDetailInvoice.timeUnit,
                paymentDetailInvoice.detailInvoiceId,
                paymentDetailInvoice.createdAt,
                paymentDetailInvoice.updatedAt,
                paymentDetailInvoice.deletedAt
            ))
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getPaymentDetailInvoiceById(id: number): Promise<PaymentDetailInvoiceEntity | null> {
        try{
            const paymentDetailInvoice = await PaymentDetailInvoiceSequelize.findByPk(id);
            if(!paymentDetailInvoice) return null;
            return new PaymentDetailInvoiceEntity(
                paymentDetailInvoice.id,
                paymentDetailInvoice.uuid,
                paymentDetailInvoice.paymentMethod,
                paymentDetailInvoice.totalAmount,
                paymentDetailInvoice.term,
                paymentDetailInvoice.timeUnit,
                paymentDetailInvoice.detailInvoiceId,
                paymentDetailInvoice.createdAt,
                paymentDetailInvoice.updatedAt,
                paymentDetailInvoice.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getPaymentDetailInvoiceByUuid(uuid: string): Promise<PaymentDetailInvoiceEntity | null> {
        try{
            const paymentDetailInvoice = await PaymentDetailInvoiceSequelize.findOne({
                where:{uuid:uuid}
            });
            if(!paymentDetailInvoice) return null;
            return new PaymentDetailInvoiceEntity(
                paymentDetailInvoice.id,
                paymentDetailInvoice.uuid,
                paymentDetailInvoice.paymentMethod,
                paymentDetailInvoice.totalAmount,
                paymentDetailInvoice.term,
                paymentDetailInvoice.timeUnit,
                paymentDetailInvoice.detailInvoiceId,
                paymentDetailInvoice.createdAt,
                paymentDetailInvoice.updatedAt,
                paymentDetailInvoice.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async updatePaymentDetailInvoice(updatePaymentDetailInvoiceDto: UpdatePaymentDetailInvoiceDto): Promise<PaymentDetailInvoiceEntity> {
        try{
            const paymentDetailInvoice = await this.getPaymentDetailInvoiceById(updatePaymentDetailInvoiceDto.id);
            if(!paymentDetailInvoice) throw CustomError.notFound('PaymentDetailInvoice not found');
            await PaymentDetailInvoiceSequelize.update({
                paymentMethod: updatePaymentDetailInvoiceDto.paymentMethod,
                term: updatePaymentDetailInvoiceDto.term,
                timeUnit: updatePaymentDetailInvoiceDto.timeUnit,
                totalAmount: updatePaymentDetailInvoiceDto.totalAmount
            },{where:{id:paymentDetailInvoice.id}});

            return new PaymentDetailInvoiceEntity(
                paymentDetailInvoice.id,
                paymentDetailInvoice.uuid,
                updatePaymentDetailInvoiceDto.paymentMethod,
                updatePaymentDetailInvoiceDto.totalAmount,
                updatePaymentDetailInvoiceDto.term,
                updatePaymentDetailInvoiceDto.timeUnit,
                paymentDetailInvoice.detailInvoiceId,
                paymentDetailInvoice.createdAt,
                paymentDetailInvoice.updatedAt,
                paymentDetailInvoice.deletedAt
            );
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}