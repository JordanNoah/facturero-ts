import { RegisterDetailTaxDto } from "../../../dtos/invoice/detail/detailTax/register-detailTax.dto";
import { UpdateDetailTaxDto } from "../../../dtos/invoice/detail/detailTax/update-detailTax.dto";
import { DetailEntity } from "../../../entities/invoice/detail/detail.entity";
import { DetailTaxEntity } from "../../../entities/invoice/detail/detailTax.entity";

export abstract class DetailTaxDataSource {
    abstract createDetailTax(registerDetailTaxDto: RegisterDetailTaxDto,detailEntity:DetailEntity | null): Promise<DetailTaxEntity>
    abstract updateDetailTax(updateDetailTaxDto: UpdateDetailTaxDto,detailEntity:DetailEntity | null): Promise<DetailTaxEntity>
    abstract getDetailTaxById(detailTaxId: number): Promise<DetailTaxEntity | null>
    abstract getDetailTaxByDetailId(detailId: number): Promise<DetailTaxEntity[]>
    abstract deleteDetailTaxById(detailTaxId: number): Promise<DetailTaxEntity>
    abstract deleteDetailTaxByDetailId(detailId: number): Promise<DetailTaxEntity[]>
}