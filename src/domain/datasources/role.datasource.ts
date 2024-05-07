import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { UpdateRoleDto } from "../dtos/role/update-role.dto";
import { RoleEntity } from "../entities/role.entity";

export abstract class RoleDatasource {
    abstract register(RegisterRoleDto:RegisterRoleDto): Promise<RoleEntity>
    abstract update(updateRoleDto:UpdateRoleDto): Promise<RoleEntity>
    abstract getAll(): Promise<RoleEntity[]>
    abstract getByUuid(uuid: string): Promise<RoleEntity|null>
    abstract getById(id: number): Promise<RoleEntity|null>
}