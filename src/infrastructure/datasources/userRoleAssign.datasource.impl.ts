import { UserRoleAssignDatasource } from "../../domain/datasources/userRoleAssign.datasource";
import { RegisterAssignRoleDto } from "../../domain/dtos/assignrole/register-assignrole.dto";
import { RemoveAssignRoleDto } from "../../domain/dtos/assignrole/remove-assignrole.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleUserEntity } from "../../domain/entities/roleUsers.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRoleEntity } from "../../domain/entities/userRole.entity";
import { UserRolesEntity } from "../../domain/entities/userRoles.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { RoleSequelize } from "../database/models/Role";
import { UserSequelize } from "../database/models/User";
import { UserRoleSequelize } from "../database/models/UserRoleAssign";
import { RoleDatasourceImpl } from "./role.datasource.impl";
import { UserDatasourceImpl } from "./user.datasource.impl";


interface GroupedByUser {
    [userId: number]: {
        user: UserEntity;
        roles: RoleEntity[];
    };
}

interface GroupedByRole {
    [roleId: number]: {
        role: RoleEntity;
        users: UserEntity[];
    };
}

export class UserRoleAssignDatasourceImpl extends UserRoleAssignDatasource {
    async assignRole(registerAssignRoleDto:RegisterAssignRoleDto): Promise<UserRoleEntity> {
        try {
            const {userId, roleId} = registerAssignRoleDto;
            const user = await new UserDatasourceImpl().getById(userId);
            if (!user) throw CustomError.notFound(`User with id ${userId} not found`);
            const role = await new RoleDatasourceImpl().getById(roleId);
            if (!role) throw CustomError.notFound(`Role with id ${roleId} not found`);
            const [userRole, created] = await UserRoleSequelize.findOrCreate({
                where: {
                    user_id: userId,
                    role_id: roleId
                },
                defaults: {
                    user_id: userId,
                    role_id: roleId
                }
            });           
            
            const userEntity = new UserEntity(
                user.id,
                user.uuid,
                user.firstname,
                user.lastname,
                user.email,
                user.address,
                user.city,
                user.phoneNumber,
                user.institutionId,
                user.createdAt,
                user.updatedAt,
                user.deletedAt,
                user.middleName,
                user.secondLastname
            );
            const roleEntity = new RoleEntity(
                role.id,
                role.uuid,
                role.name,
                role.abbreviation,
                role.createdAt,
                role.updatedAt,
                role.deletedAt
            );
            return new UserRoleEntity(userEntity, roleEntity);            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAssignedRoles(userId: number): Promise<UserRolesEntity|null> {
        try {
            const userRoles = await UserRoleSequelize.findAll({
                where: {
                    user_id: userId
                },
                include: [
                    {
                        model: UserSequelize,
                        as: 'user'
                    },
                    {
                        model: RoleSequelize,
                        as: 'role'
                    }
                ]
            })
            if (!userRoles) return null;

            const groupedByUser = userRoles.reduce((acc:GroupedByUser,row) => {
                const userId = row.user_id;

                if (!acc[userId]) {
                    acc[userId] = {
                        user: new UserEntity(
                            row.user.id,
                            row.user.uuid,
                            row.user.firstname,
                            row.user.lastname,
                            row.user.email,
                            row.user.address,
                            row.user.city,
                            row.user.phone_number,
                            row.user.institution_id,
                            row.user.createdAt,
                            row.user.updatedAt,
                            row.user.deletedAt,
                            row.user.middle_name,
                            row.user.second_lastname
                        ),
                        roles: []
                    };
                }

                acc[userId].roles.push(new RoleEntity(
                    row.role.id,
                    row.role.uuid,
                    row.role.name,
                    row.role.abbreviation,
                    row.role.createdAt,
                    row.role.updatedAt,
                    row.role.deletedAt
                ));

                return acc;
            },{});

            const result = Object.values(groupedByUser)[0];
            
            return new UserRolesEntity(result.user,result.roles);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAssignedUsers(roleId: number): Promise<RoleUserEntity | null> {
        try {
            const userRoles = await UserRoleSequelize.findAll({
                where: {
                    role_id:roleId
                },
                include: [
                    {
                        model: UserSequelize,
                        as: 'user'
                    },
                    {
                        model: RoleSequelize,
                        as: 'role'
                    }
                ]
            })
            
            if (!userRoles) return null;

            const groupedByRole = userRoles.reduce((acc:GroupedByRole,row) => {
                const roleId = row.role_id;
                if (!acc[roleId]) {
                    acc[roleId] = {
                        role: new RoleEntity(
                            row.role.id,
                            row.role.uuid,
                            row.role.name,
                            row.role.abbreviation,
                            row.role.createdAt,
                            row.role.updatedAt,
                            row.role.deletedAt
                        ),
                        users: []
                    };
                }

                acc[roleId].users.push(new UserEntity(
                    row.user.id,
                    row.user.uuid,
                    row.user.firstname,
                    row.user.lastname,
                    row.user.email,
                    row.user.address,
                    row.user.city,
                    row.user.phone_number,
                    row.user.institution_id,
                    row.user.createdAt,
                    row.user.updatedAt,
                    row.user.deletedAt,
                    row.user.middle_name,
                    row.user.second_lastname
                ));

                return acc;
            },{});

            const result = Object.values(groupedByRole)[0];
            return new RoleUserEntity(result.role,result.users);
            
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async unassignRole(removeAssignRoleDto:RemoveAssignRoleDto): Promise<UserRoleEntity> {
        try {
            const {roleAssignId} = removeAssignRoleDto;
            const userRole = await this.getById(roleAssignId);
            if (!userRole) throw CustomError.notFound(`Role assign with id ${roleAssignId} not found`);
            const deleted =  await UserRoleSequelize.destroy({where: {id: roleAssignId}});
            if (!deleted) throw CustomError.internalSever();
            
            return userRole
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(userId: number): Promise<UserRoleEntity | null> {
        try {
            const userRole = await UserRoleSequelize.findByPk(userId,{
                include: [
                    {
                        model: UserSequelize,
                        as: 'user'
                    },
                    {
                        model: RoleSequelize,
                        as: 'role'
                    }
                ]
            });
            
            if (!userRole) return null;
            const userEntity = new UserEntity(
                userRole.user.id,
                userRole.user.uuid,
                userRole.user.firstname,
                userRole.user.lastname,
                userRole.user.email,
                userRole.user.address,
                userRole.user.city,
                userRole.user.phone_number,
                userRole.user.institution_id,
                userRole.user.createdAt,
                userRole.user.updatedAt,
                userRole.user.deletedAt,
                userRole.user.middle_name,
                userRole.user.second_lastname
            );
            const roleEntity = new RoleEntity(
                userRole.role.id,
                userRole.role.uuid,
                userRole.role.name,
                userRole.role.abbreviation,
                userRole.role.createdAt,
                userRole.role.updatedAt,
                userRole.role.deletedAt
            );

            return new UserRoleEntity(userEntity, roleEntity);
        } catch (error) {            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}