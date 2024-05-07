import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

export class RoleUserEntity {
    constructor(
        public role: RoleEntity,
        public users: UserEntity[]
    ){}
}