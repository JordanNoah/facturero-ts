import { RegisterAdditionalDetailDetailDto } from "../../../dtos/invoice/detail/additionalDetailDetail/register-additionalDetailDetail.dto";
import { UpdateAdditionalDetailDetailDto } from "../../../dtos/invoice/detail/additionalDetailDetail/update-additionaDetailDetail.dto";
import { AdditionalDetailDetailEntity } from "../../../entities/invoice/detail/additionalDetailDetail.entity";
import { DetailEntity } from "../../../entities/invoice/detail/detail.entity";

export abstract class AdditionalDetailDetailDataSource {
    abstract createAdditionalDetailDetail(registerAdditionalDetailDetailDto: RegisterAdditionalDetailDetailDto, detailEntity: DetailEntity | null): Promise<AdditionalDetailDetailEntity>;
    abstract deleteAdditionalDetailDetailByAdditionalDetailId(additionalDetailId: number): Promise<AdditionalDetailDetailEntity[]>;
    abstract deleteAdditionalDetailDetailById(additionalDetailDetailId: number): Promise<AdditionalDetailDetailEntity>;
    abstract getAdditionalDetailDetailByAdditionalDetailId(additionalDetailId: number): Promise<AdditionalDetailDetailEntity[]>;
    abstract getAdditionalDetailDetailById(additionalDetailDetailId: number): Promise<AdditionalDetailDetailEntity | null>;
    abstract updateAdditionalDetailDetailById(updateAdditionalDetailDetailDto: UpdateAdditionalDetailDetailDto): Promise<AdditionalDetailDetailEntity>;
}