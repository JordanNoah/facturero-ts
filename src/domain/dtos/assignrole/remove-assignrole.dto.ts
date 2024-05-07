export class RemoveAssignRoleDto {
    constructor(
        public roleAssignId: number
    ){}

    static create(object:{[key:string]:any}):[string?,RemoveAssignRoleDto?]{
        const {
            roleAssignId
        } = object

        if(!roleAssignId) return ['roleAssignId is required']
        return [
            undefined,
            new RemoveAssignRoleDto(
                roleAssignId
            )
        ]
    }
}