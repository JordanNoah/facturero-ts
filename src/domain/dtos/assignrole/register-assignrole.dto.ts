export class RegisterAssignRoleDto {
    constructor(
        public userId: number,
        public roleId: number
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAssignRoleDto?]{
        const {
            userId,
            roleId
        } = object

        if(!userId) return ['userId is required']
        if(!roleId) return ['roleId is required']
        return [
            undefined,
            new RegisterAssignRoleDto(
                userId,
                roleId
            )
        ]
    }
}