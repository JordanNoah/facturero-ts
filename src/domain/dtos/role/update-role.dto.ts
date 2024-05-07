export class UpdateRoleDto {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public abbreviation: string
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateRoleDto?] {
        const {
            id,
            uuid,
            name,
            abbreviation
        } = object
        return [
            undefined,
            new UpdateRoleDto(
                id,
                uuid,
                name,
                abbreviation
            )
        ]
    }
}