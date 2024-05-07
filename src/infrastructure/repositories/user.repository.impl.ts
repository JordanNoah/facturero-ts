import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/user/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly userDatasource: UserDatasource
    ) {}

    getById(id:number): Promise<UserEntity | null>{
        return this.userDatasource.getById(id);
    }
    getByUuid(uuid: string): Promise<UserEntity | null>{
        return this.userDatasource.getByUuid(uuid);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity>{
        return this.userDatasource.register(registerUserDto);
    }
    getAll(): Promise<UserEntity[]>{
        return this.userDatasource.getAll();
    }
    update(updateUserDto: UpdateUserDto): Promise<UserEntity>{
        return this.userDatasource.update(updateUserDto);
    }
}