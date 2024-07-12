import { FinancialInformationDataSource } from "../../../domain/datasources/invoice/financialInformation.datasource";
import { RegisterFinancialInformationDto } from "../../../domain/dtos/invoice/register-financialInformation.dto";
import { UpdateFinancialInformationDto } from "../../../domain/dtos/invoice/update-financialInformation.dto";
import { FinancialInformationEntity } from "../../../domain/entities/invoice/financialInformation.entity";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { FinancialInformationSequelize } from "../../database/models/invoice/FinancialInformation";
import { InvoiceDatasourceImpl } from "./invoice.datasource.impl";

export class FinancialInformationDataSourceImpl implements FinancialInformationDataSource {
    async createFinancialInformation(registerFinancialInformation: RegisterFinancialInformationDto, invoiceEntity: InvoiceEntity | null): Promise<FinancialInformationEntity> {
        try {
            let invoice: InvoiceEntity;
            if (!invoiceEntity) {
                let invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(registerFinancialInformation.invoiceId);
                if (!invoiceDb) throw CustomError.notFound('Invoice not found');
                else invoice = invoiceDb;
            }else{
                invoice = invoiceEntity;
            }
            const [financialInformation,created] = await FinancialInformationSequelize.findOrCreate({
                where: {
                    invoiceId: invoice.id
                },
                defaults: {
                    invoiceId: invoice.id,
                    environment: registerFinancialInformation.environment,
                    emissionType: registerFinancialInformation.emissionType,
                    businessName: registerFinancialInformation.businessName,
                    tradeName: registerFinancialInformation.tradeName,
                    taxpayerId: registerFinancialInformation.taxpayerId,
                    accessKey: registerFinancialInformation.accessKey,
                    documentCode: registerFinancialInformation.documentCode,
                    establishment: registerFinancialInformation.establishment,
                    pointOfSale: registerFinancialInformation.pointOfSale,
                    sequence: registerFinancialInformation.sequence,
                    address: registerFinancialInformation.address
                }
            });

            return new FinancialInformationEntity(
                financialInformation.id,
                financialInformation.invoiceId,
                financialInformation.environment,
                financialInformation.emissionType,
                financialInformation.businessName,
                financialInformation.tradeName,
                financialInformation.taxpayerId,
                financialInformation.accessKey,
                financialInformation.documentCode,
                financialInformation.establishment,
                financialInformation.pointOfSale,
                financialInformation.sequence,
                financialInformation.address,
                financialInformation.createdAt,
                financialInformation.updatedAt,
                financialInformation.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getFinancialInformationByInvoiceId(invoiceId: number): Promise<FinancialInformationEntity | null> {
        try {
            const financialInformation = await FinancialInformationSequelize.findOne({
                where: {
                    invoiceId: invoiceId
                }
            });

            if (!financialInformation) return null;

            return new FinancialInformationEntity(
                financialInformation.id,
                financialInformation.invoiceId,
                financialInformation.environment,
                financialInformation.emissionType,
                financialInformation.businessName,
                financialInformation.tradeName,
                financialInformation.taxpayerId,
                financialInformation.accessKey,
                financialInformation.documentCode,
                financialInformation.establishment,
                financialInformation.pointOfSale,
                financialInformation.sequence,
                financialInformation.address,
                financialInformation.createdAt,
                financialInformation.updatedAt,
                financialInformation.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async updateFinancialInformation(financialInformation: UpdateFinancialInformationDto, invoiceEntity: InvoiceEntity | null): Promise<FinancialInformationEntity> {
        try {
            let invoice: InvoiceEntity;
            if (!invoiceEntity) {
                let invoiceDb = await new InvoiceDatasourceImpl().getInvoiceById(financialInformation.invoiceId);
                if (!invoiceDb) throw CustomError.notFound('Invoice not found');
                else invoice = invoiceDb;
            }else{
                invoice = invoiceEntity;
            }

            const financialInformationDb = await FinancialInformationSequelize.findOne({
                where: {
                    id: financialInformation.id
                }
            });

            if (!financialInformationDb) throw CustomError.notFound('Financial Information not found');

            financialInformationDb.invoiceId = invoice.id;
            financialInformationDb.environment = financialInformation.environment;
            financialInformationDb.emissionType = financialInformation.emissionType;
            financialInformationDb.businessName = financialInformation.businessName;
            financialInformationDb.tradeName = financialInformation.tradeName;
            financialInformationDb.taxpayerId = financialInformation.taxpayerId;
            financialInformationDb.accessKey = financialInformation.accessKey;
            financialInformationDb.documentCode = financialInformation.documentCode;
            financialInformationDb.establishment = financialInformation.establishment;
            financialInformationDb.pointOfSale = financialInformation.pointOfSale;
            financialInformationDb.sequence = financialInformation.sequence;
            financialInformationDb.address = financialInformation.address;

            await financialInformationDb.save();

            return new FinancialInformationEntity(
                financialInformationDb.id,
                financialInformationDb.invoiceId,
                financialInformationDb.environment,
                financialInformationDb.emissionType,
                financialInformationDb.businessName,
                financialInformationDb.tradeName,
                financialInformationDb.taxpayerId,
                financialInformationDb.accessKey,
                financialInformationDb.documentCode,
                financialInformationDb.establishment,
                financialInformationDb.pointOfSale,
                financialInformationDb.sequence,
                financialInformationDb.address,
                financialInformationDb.createdAt,
                financialInformationDb.updatedAt,
                financialInformationDb.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}