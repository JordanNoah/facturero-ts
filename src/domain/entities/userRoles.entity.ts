import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

export class UserRolesEntity {
    constructor(
        public user: UserEntity,
        public roles: RoleEntity[]
    ){}
}