import { RegisterUserDto } from "../dtos/user/register-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
    abstract register(RegisterUserDto:RegisterUserDto): Promise<UserEntity>
    abstract update(updateUserDto:UpdateUserDto): Promise<UserEntity>
    abstract getAll(): Promise<UserEntity[]>
    abstract getByUuid(uuid: string): Promise<UserEntity|null>
    abstract getById(id: number): Promise<UserEntity|null>
}