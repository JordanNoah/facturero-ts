export class RegisterRoleDto {
    constructor(
        public name: string,
        public abbreviation: string
    ) {}

    static create(object:{[key:string]:any}):[string?,RegisterRoleDto?]{
        const {
            name,
            abbreviation
        } = object
        
        if(!name) return ['name is required']
        if(!abbreviation) return ['abbreviation is required']
        return [
            undefined,
            new RegisterRoleDto(
                name,
                abbreviation
            )
        ]
    }
}