import { RegisterDetailDto } from "../../../dtos/invoice/detail/register-detail.dto";
import { UpdateDetailDto } from "../../../dtos/invoice/detail/update-detail.dto";
import { DetailEntity } from "../../../entities/invoice/detail/detail.entity";
import { InvoiceEntity } from "../../../entities/invoice/invoice.entity";

export abstract class DetailDataSource {
    abstract createDetail(registerDetailDto: RegisterDetailDto, invoiceEntity:InvoiceEntity | null): Promise<DetailEntity>;
    abstract updateDetail(updateInfoInvoiceDto: UpdateDetailDto, invoiceEntity: InvoiceEntity | null): Promise<DetailEntity>;
    abstract deleteDetailById(detailId: number): Promise<DetailEntity>;
    abstract getDetailsByInvoiceId(invoiceId: number): Promise<DetailEntity[]>;
    abstract getDetailByUuid(detailUuid: string): Promise<DetailEntity | null>;
    abstract getDetailById(detailId: number): Promise<DetailEntity | null>;
}