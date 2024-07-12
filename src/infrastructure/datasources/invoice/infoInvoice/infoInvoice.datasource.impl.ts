import { InfoInvoiceDatasource } from "../../../../domain/datasources/invoice/infoInvoice/infoInvoice.datasource";
import { RegisterInfoInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/register-infoInvoice.dto";
import { UpdateInfoInvoiceDto } from "../../../../domain/dtos/invoice/infoInvoice/update-infoInvoice.dto";
import { InfoInvoiceEntity } from "../../../../domain/entities/invoice/infoInvoice/infoInvoice.entity";
import { InvoiceEntity } from "../../../../domain/entities/invoice/invoice.entity";
import { CustomError } from "../../../../domain/errors/custom.error";
import { v4 as uuidv4 } from "uuid"
import { InvoiceDatasourceImpl } from "../invoice.datasource.impl";
import { InfoInvoiceSequelize } from "../../../database/models/invoice/InfoInvoice/InfoInvoice";

export class InfoInvoiceDatasourceImpl implements InfoInvoiceDatasource {
    async createInfoInvoice(registerInfoInvoiceDto: RegisterInfoInvoiceDto,infoInvoiceEntity:InfoInvoiceEntity|null): Promise<InfoInvoiceEntity> {
        try {
            let invoice: InvoiceEntity;
            if(!infoInvoiceEntity){
                let invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(registerInfoInvoiceDto.idInvoice);
                if(!invoiceDb) throw CustomError.notFound('Invoice not found');
                else invoice = invoiceDb;
            }else{
                invoice = infoInvoiceEntity;
            }
            const {issuanceDate,establishmentAddress,specialContributor,accountingObligation,buyerIdentificationType,remissionGuide,buyerBusinessName,buyerIdentification,buyerAddress,totalWithoutTaxes,totalDiscount,tip,totalAmount,currency,vatRetentionValue,incomeTaxRetentionValue} = registerInfoInvoiceDto;
            const [infoInvoice,created] = await InfoInvoiceSequelize.findOrCreate({
                where:{
                    idInvoice:invoice.id
                },
                defaults:{
                    uuid:uuidv4(),
                    issuanceDate:issuanceDate,
                    establishmentAddress:establishmentAddress,
                    specialContributor:specialContributor,
                    accountingObligation:accountingObligation,
                    buyerIdentificationType:buyerIdentificationType,
                    remissionGuide:remissionGuide,
                    buyerBusinessName:buyerBusinessName,
                    buyerIdentification:buyerIdentification,
                    buyerAddress:buyerAddress,
                    totalWithoutTaxes:totalWithoutTaxes,
                    totalDiscount:totalDiscount,
                    tip:tip,
                    totalAmount:totalAmount,
                    currency:currency,
                    vatRetentionValue:vatRetentionValue,
                    incomeTaxRetentionValue:incomeTaxRetentionValue,
                    idInvoice:invoice.id
                }
            })

            return new InfoInvoiceEntity(
                infoInvoice.id,
                infoInvoice.uuid,
                infoInvoice.issuanceDate,
                infoInvoice.establishmentAddress,
                infoInvoice.specialContributor,
                infoInvoice.accountingObligation,
                infoInvoice.buyerIdentificationType,
                infoInvoice.remissionGuide,
                infoInvoice.buyerBusinessName,
                infoInvoice.buyerIdentification,
                infoInvoice.buyerAddress,
                infoInvoice.totalWithoutTaxes,
                infoInvoice.totalDiscount,
                infoInvoice.tip,
                infoInvoice.totalAmount,
                infoInvoice.currency,
                infoInvoice.vatRetentionValue,
                infoInvoice.incomeTaxRetentionValue,
                infoInvoice.idInvoice,
                infoInvoice.createdAt,
                infoInvoice.updatedAt,
                infoInvoice.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteInfoInvoice(infoInvoiceId: number): Promise<InfoInvoiceEntity> {
        try {
            const infoInvoice = await this.getInfoInvoiceById(infoInvoiceId);
            if(!infoInvoice) throw CustomError.notFound('InfoInvoice not found');
            await InfoInvoiceSequelize.destroy({
                where:{id:infoInvoice.id}
            })
            return infoInvoice;
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInfoInvoiceByInvoiceId(invoiceId: number): Promise<InfoInvoiceEntity | null> {
        try {
            const infoInvoice = await InfoInvoiceSequelize.findOne({
                where:{idInvoice:invoiceId}
            })
            if(!infoInvoice) return null;
            return new InfoInvoiceEntity(
                infoInvoice.id,
                infoInvoice.uuid,
                infoInvoice.issuanceDate,
                infoInvoice.establishmentAddress,
                infoInvoice.specialContributor,
                infoInvoice.accountingObligation,
                infoInvoice.buyerIdentificationType,
                infoInvoice.remissionGuide,
                infoInvoice.buyerBusinessName,
                infoInvoice.buyerIdentification,
                infoInvoice.buyerAddress,
                infoInvoice.totalWithoutTaxes,
                infoInvoice.totalDiscount,
                infoInvoice.tip,
                infoInvoice.totalAmount,
                infoInvoice.currency,
                infoInvoice.vatRetentionValue,
                infoInvoice.incomeTaxRetentionValue,
                infoInvoice.idInvoice,
                infoInvoice.createdAt,
                infoInvoice.updatedAt,
                infoInvoice.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInfoInvoiceById(infoInvoiceId: number): Promise<InfoInvoiceEntity | null> {
        try {
            const infoInvoice = await InfoInvoiceSequelize.findByPk(infoInvoiceId);
            if(!infoInvoice) return null;
            return new InfoInvoiceEntity(
                infoInvoice.id,
                infoInvoice.uuid,
                infoInvoice.issuanceDate,
                infoInvoice.establishmentAddress,
                infoInvoice.specialContributor,
                infoInvoice.accountingObligation,
                infoInvoice.buyerIdentificationType,
                infoInvoice.remissionGuide,
                infoInvoice.buyerBusinessName,
                infoInvoice.buyerIdentification,
                infoInvoice.buyerAddress,
                infoInvoice.totalWithoutTaxes,
                infoInvoice.totalDiscount,
                infoInvoice.tip,
                infoInvoice.totalAmount,
                infoInvoice.currency,
                infoInvoice.vatRetentionValue,
                infoInvoice.incomeTaxRetentionValue,
                infoInvoice.idInvoice,
                infoInvoice.createdAt,
                infoInvoice.updatedAt,
                infoInvoice.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInfoInvoiceByUuid(uuid: string): Promise<InfoInvoiceEntity | null> {
        try {
            const infoInvoice = await InfoInvoiceSequelize.findOne({
                where:{uuid:uuid}
            })

            if(!infoInvoice) return null;

            return new InfoInvoiceEntity(
                infoInvoice.id,
                infoInvoice.uuid,
                infoInvoice.issuanceDate,
                infoInvoice.establishmentAddress,
                infoInvoice.specialContributor,
                infoInvoice.accountingObligation,
                infoInvoice.buyerIdentificationType,
                infoInvoice.remissionGuide,
                infoInvoice.buyerBusinessName,
                infoInvoice.buyerIdentification,
                infoInvoice.buyerAddress,
                infoInvoice.totalWithoutTaxes,
                infoInvoice.totalDiscount,
                infoInvoice.tip,
                infoInvoice.totalAmount,
                infoInvoice.currency,
                infoInvoice.vatRetentionValue,
                infoInvoice.incomeTaxRetentionValue,
                infoInvoice.idInvoice,
                infoInvoice.createdAt,
                infoInvoice.updatedAt,
                infoInvoice.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updateInfoInvoice(updateInfoInvoiceDto: UpdateInfoInvoiceDto): Promise<InfoInvoiceEntity> {
        try {
            const infoInvoice = await this.getInfoInvoiceByUuid(updateInfoInvoiceDto.uuid);
            if(!infoInvoice) throw CustomError.notFound('InfoInvoice not found');
            const {issuanceDate,establishmentAddress,specialContributor,accountingObligation,buyerIdentificationType,remissionGuide,buyerBusinessName,buyerIdentification,buyerAddress,totalWithoutTaxes,totalDiscount,tip,totalAmount,currency,vatRetentionValue,incomeTaxRetentionValue} = updateInfoInvoiceDto;
            infoInvoice.issuanceDate = issuanceDate;
            infoInvoice.establishmentAddress = establishmentAddress;
            infoInvoice.specialContributor = specialContributor;
            infoInvoice.accountingObligation = accountingObligation;
            infoInvoice.buyerIdentificationType = buyerIdentificationType;
            infoInvoice.remissionGuide = remissionGuide;
            infoInvoice.buyerBusinessName = buyerBusinessName;
            infoInvoice.buyerIdentification = buyerIdentification;
            infoInvoice.buyerAddress = buyerAddress;
            infoInvoice.totalWithoutTaxes = totalWithoutTaxes;
            infoInvoice.totalDiscount = totalDiscount;
            infoInvoice.tip = tip;
            infoInvoice.totalAmount = totalAmount;
            infoInvoice.currency = currency;
            infoInvoice.vatRetentionValue = vatRetentionValue;
            infoInvoice.incomeTaxRetentionValue = incomeTaxRetentionValue;
            await InfoInvoiceSequelize.update({
                issuanceDate:issuanceDate,
                establishmentAddress:establishmentAddress,
                specialContributor:specialContributor,
                accountingObligation:accountingObligation,
                buyerIdentificationType:buyerIdentificationType,
                remissionGuide:remissionGuide,
                buyerBusinessName:buyerBusinessName,
                buyerIdentification:buyerIdentification,
                buyerAddress:buyerAddress,
                totalWithoutTaxes:totalWithoutTaxes,
                totalDiscount:totalDiscount,
                tip:tip,
                totalAmount:totalAmount,
                currency:currency,
                vatRetentionValue:vatRetentionValue,
                incomeTaxRetentionValue:incomeTaxRetentionValue
            },{
                where:{id:infoInvoice.id}
            })
            return infoInvoice;
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}