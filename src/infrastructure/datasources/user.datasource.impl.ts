import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/user/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { UserSequelize } from "../database/models/User";
import { v4 as uuidv4 } from "uuid"
import { InstitutionDatasourceImpl } from "./institution.datasource.impl";

export class UserDatasourceImpl extends UserDatasource {
    async register(RegisterUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const { firstname, lastname, email, address, city, phoneNumber, institutionId, middleName, secondLastname } = RegisterUserDto;
            const institution = await new InstitutionDatasourceImpl().getById(institutionId);
            if (!institution) throw CustomError.notFound(`Institution with id ${institutionId} not found`);
            const [user, created] = await UserSequelize.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    firstname: firstname,
                    uuid: uuidv4(),
                    lastname: lastname,
                    email: email,
                    address: address,
                    city: city,
                    phone_number: phoneNumber,
                    institution_id: institution.id,
                    middle_name: middleName,
                    second_lastname: secondLastname
                },
                raw:true
            });
                console.log(user);
            return new UserEntity(
                user.id,
                user.uuid,
                user.firstname,
                user.lastname,
                user.email,
                user.address,
                user.city,
                user.phone_number,
                user.institution_id,
                user.createdAt,
                user.updatedAt,
                user.deletedAt,
                user.middle_name,
                user.second_lastname
            );
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const { id, uuid, firstname, lastname, email, address, city, phoneNumber, institutionId, middleName, secondLastname } = updateUserDto;

            let user = await this.getById(id);

            if (!user) throw CustomError.notFound(`User with id ${id} not found`);
            const institution = await new InstitutionDatasourceImpl().getById(institutionId);
            if (!institution) throw CustomError.notFound(`Institution with id ${institutionId} not found`);

            await UserSequelize.update({
                uuid: uuid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                address: address,
                city: city,
                phone_number: phoneNumber,
                institution_id: institutionId,
                middle_name: middleName,
                second_lastname: secondLastname
            }, {
                where: {
                    id: user.id
                }
            });

            return new UserEntity(
                user.id,
                uuid,
                firstname,
                lastname,
                email,
                address,
                city,
                phoneNumber,
                institutionId,
                user.createdAt,
                user.updatedAt,
                user.deletedAt,
                middleName,
                secondLastname
            );
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAll(): Promise<UserEntity[]> {
        try {
            return (await UserSequelize.findAll()).map(user => new UserEntity(user.id, user.uuid, user.firstname, user.lastname, user.email, user.address, user.city, user.phone_number, user.institution_id, user.createdAt, user.updatedAt, user.deletedAt, user.middle_name, user.second_lastname));
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getByUuid(uuid: string): Promise<UserEntity | null> {
        try {
            const user = await UserSequelize.findOne({
                where: {
                    uuid: uuid
                }
            });
            if (!user) return null;
            return new UserEntity(user.id, user.uuid, user.firstname, user.lastname, user.email, user.address, user.city, user.phone_number, user.institution_id, user.createdAt, user.updatedAt, user.deletedAt, user.middle_name, user.second_lastname);
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(id: number): Promise<UserEntity | null> {
        try {
            const user = await UserSequelize.findByPk(id);
            if (!user) return null;
            return new UserEntity(user.id, user.uuid, user.firstname, user.lastname, user.email, user.address, user.city, user.phone_number, user.institution_id, user.createdAt, user.updatedAt, user.deletedAt, user.middle_name, user.second_lastname);
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}