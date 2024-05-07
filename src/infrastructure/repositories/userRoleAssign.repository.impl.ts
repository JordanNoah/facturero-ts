import { UserRoleAssignDatasource } from "../../domain/datasources/userRoleAssign.datasource";
import { RegisterAssignRoleDto } from "../../domain/dtos/assignrole/register-assignrole.dto";
import { RemoveAssignRoleDto } from "../../domain/dtos/assignrole/remove-assignrole.dto";
import { RoleUserEntity } from "../../domain/entities/roleUsers.entity";
import { UserRoleEntity } from "../../domain/entities/userRole.entity";
import { UserRolesEntity } from "../../domain/entities/userRoles.entity";
import { UserRoleAssignRepository } from "../../domain/repositories/userRoleAssign.repository";

export class UserRoleAssignRepositoryImpl implements UserRoleAssignRepository {
    constructor(
        private readonly userRoleAssignDatasource: UserRoleAssignDatasource
    ) {}

    assignRole(registerAssignRoleDto:RegisterAssignRoleDto): Promise<UserRoleEntity> {
        return this.userRoleAssignDatasource.assignRole(registerAssignRoleDto)
    }

    unassignRole(removeAssignRoleDto:RemoveAssignRoleDto): Promise<UserRoleEntity> {
        return this.userRoleAssignDatasource.unassignRole(removeAssignRoleDto)
    }

    getAssignedRoles(userId: number): Promise<UserRolesEntity|null> {
        return this.userRoleAssignDatasource.getAssignedRoles(userId)
    }

    getAssignedUsers(roleId: number): Promise<RoleUserEntity | null> {
        return this.userRoleAssignDatasource.getAssignedUsers(roleId)
    }
    getById(userId: number): Promise<UserRoleEntity | null> {
        return this.userRoleAssignDatasource.getById(userId)
    }
}