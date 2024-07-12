import { InvoiceDataSource } from "../../../domain/datasources/invoice/invoice.datasource";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { InvoiceSequelize } from "../../database/models/invoice/Invoice";
import { v4 as uuidv4 } from "uuid"

export class InvoiceDatasourceImpl implements InvoiceDataSource{
    async createInvoice(): Promise<InvoiceEntity> {
        try {
            const invoice = await InvoiceSequelize.create({
                uuid: uuidv4()
            });
            invoice.save();

            return new InvoiceEntity(
                invoice.id,
                invoice.uuid,
                invoice.createdAt,
                invoice.updatedAt,
                invoice.deletedAt
            )
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteInvoice(id: number): Promise<InvoiceEntity> {
        try {
            const invoice = await this.getInvoiceById(id);
            if (!invoice) throw CustomError.notFound('Invoice not found');
            await InvoiceSequelize.destroy({where: {id: id}})
            return invoice;
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInvoiceByUuid(uuid: string): Promise<InvoiceEntity | null> {
        try {
            const invoice = await InvoiceSequelize.findOne({where: {uuid: uuid}});
            if (!invoice) return null;
            return new InvoiceEntity(
                invoice.id,
                invoice.uuid,
                invoice.createdAt,
                invoice.updatedAt,
                invoice.deletedAt
            )
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInvoiceById(id: number): Promise<InvoiceEntity | null> {
        try {
            const invoice = await InvoiceSequelize.findByPk(id);
            if (!invoice) return null;
            return new InvoiceEntity(
                invoice.id,
                invoice.uuid,
                invoice.createdAt,
                invoice.updatedAt,
                invoice.deletedAt
            )
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getInvoices(): Promise<InvoiceEntity[]> {
        try {
            const invoices = await InvoiceSequelize.findAll();
            return invoices.map(invoice => new InvoiceEntity(
                invoice.id,
                invoice.uuid,
                invoice.createdAt,
                invoice.updatedAt,
                invoice.deletedAt
            ))
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updateInvoice(): Promise<void> {
        try {
            
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async registerInvoice(): Promise<InvoiceEntity> {
        try {
            return new InvoiceEntity(
                0,
                uuidv4(),
                new Date(),
                new Date(),
                null
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}