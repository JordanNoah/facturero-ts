import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

export class UserRoleEntity {
    constructor(
        public user: UserEntity,
        public role: RoleEntity
    ){}
}