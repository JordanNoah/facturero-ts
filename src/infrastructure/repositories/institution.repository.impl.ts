import {InstitutionRepository} from "../../domain/repositories/institution.repository";
import {InstitutionDatasource} from "../../domain/datasources/institution.datasource";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {RegisterInstitutionDto} from "../../domain/dtos/institution/register-institution.dto";
import {UpdateInstitutionDto} from "../../domain/dtos/institution/update-institution.dto";

export class InstitutionRepositoryImpl implements InstitutionRepository {
    constructor(
        private readonly institutionDatasource: InstitutionDatasource
    ) {}

    getById(id: number): Promise<InstitutionEntity | null> {
        return this.institutionDatasource.getById(id)
    }

    getByUuid(uuid: string): Promise<InstitutionEntity | null> {
        return this.institutionDatasource.getByUuid(uuid)
    }

    register(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        return this.institutionDatasource.register(registerInstitutionDto)
    }

    getAll(): Promise<InstitutionEntity[]> {
        return this.institutionDatasource.getAll()
    }

    update(updateInstitutionDto: UpdateInstitutionDto): Promise<InstitutionEntity> {
        return this.institutionDatasource.update(updateInstitutionDto)
    }
}