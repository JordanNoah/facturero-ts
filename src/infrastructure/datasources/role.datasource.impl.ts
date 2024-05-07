import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { UpdateRoleDto } from "../../domain/dtos/role/update-role.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { v4 as uuidv4 } from "uuid"
import { RoleSequelize } from "../database/models/Role";

export class RoleDatasourceImpl extends RoleDatasource {
    async register(RegisterRoleDto: RegisterRoleDto): Promise<RoleEntity> {
        try {
            const {name,abbreviation} = RegisterRoleDto;
            const [role,created] = await RoleSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation
                },
                defaults:{
                    name:name,
                    abbreviation:abbreviation,
                    uuid:uuidv4()
                }
            })
            return new RoleEntity(
                role.id,
                role.name,
                role.abbreviation,
                role.uuid,
                role.createdAt,
                role.updatedAt,
                role.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async update(updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        try {
            const {id,uuid,name,abbreviation} = updateRoleDto;

            let role = await this.getById(id)

            if (!role)throw CustomError.notFound(`Role with id ${id} not found`)

            await RoleSequelize.update({
                uuid:uuid,
                name:name,
                abbreviation:abbreviation
            },{
                where:{
                    id:role.id
                }
            })

            return new RoleEntity(
                role.id,
                name,
                abbreviation,
                uuid,
                role.createdAt,
                role.updatedAt,
                role.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAll(): Promise<RoleEntity[]> {
        try {
            return (await RoleSequelize.findAll()).map(role => new RoleEntity(role.id,role.name,role.abbreviation,role.uuid,role.createdAt,role.updatedAt,role.deletedAt))
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getById(id: number): Promise<RoleEntity | null> {
        try {
            const role = await RoleSequelize.findByPk(id)
            if (!role){
                return null
            }
            return new RoleEntity(role.id,role.name,role.abbreviation,role.uuid,role.createdAt,role.updatedAt,role.deletedAt)
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getByUuid(uuid: string): Promise<RoleEntity | null> {
        try {
            const role = await RoleSequelize.findOne({
                where:{
                    uuid:uuid
                }
            })
            if (!role){
                return null
            }
            return new RoleEntity(role.id,role.name,role.abbreviation,role.uuid,role.createdAt,role.updatedAt,role.deletedAt)
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}