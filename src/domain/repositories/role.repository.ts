import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { RoleEntity } from "../entities/role.entity";

export abstract class RoleRepository {
    abstract register(registerRoleDto:RegisterRoleDto): Promise<RoleEntity>
    abstract getAll(): Promise<RoleEntity[]>
    abstract getByUuid(uuid: string): Promise<RoleEntity|null>
    abstract getById(id: number): Promise<RoleEntity|null>
    abstract update(role: RoleEntity): Promise<RoleEntity>
}