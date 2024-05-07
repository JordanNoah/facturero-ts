import { RegisterAssignRoleDto } from "../dtos/assignrole/register-assignrole.dto";
import { RemoveAssignRoleDto } from "../dtos/assignrole/remove-assignrole.dto";
import { RoleUserEntity } from "../entities/roleUsers.entity";
import { UserRoleEntity } from "../entities/userRole.entity";
import { UserRolesEntity } from "../entities/userRoles.entity";

export abstract class UserRoleAssignDatasource {
    abstract assignRole(registerAssignRoleDto:RegisterAssignRoleDto): Promise<UserRoleEntity>
    abstract unassignRole(removeAssignRoleDto:RemoveAssignRoleDto): Promise<UserRoleEntity>
    abstract getAssignedRoles(userId: number): Promise<UserRolesEntity|null>
    abstract getAssignedUsers(roleId: number): Promise<RoleUserEntity | null>
    abstract getById(userId: number): Promise<UserRoleEntity | null>
}