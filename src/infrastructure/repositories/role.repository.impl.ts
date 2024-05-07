import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { UpdateInstitutionDto } from "../../domain/dtos/institution/update-institution.dto";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";

export class RoleRepositoryImpl implements RoleRepository {
    constructor(
        private readonly roleDatasource: RoleDatasource
    ) {}

    getById(id:number): Promise<RoleEntity | null>{
        return this.roleDatasource.getById(id);
    }
    getByUuid(uuid: string): Promise<RoleEntity | null>{
        return this.roleDatasource.getByUuid(uuid);
    }
    register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity>{
        return this.roleDatasource.register(registerRoleDto);
    }
    getAll(): Promise<RoleEntity[]>{
        return this.roleDatasource.getAll();
    }
    update(updateRoleDto: UpdateInstitutionDto): Promise<RoleEntity>{
        return this.roleDatasource.update(updateRoleDto);
    }
}