export class UpdateUserDto {
    constructor(
        public id: number,
        public uuid: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public address: string,
        public city: string,
        public phoneNumber: string,
        public institutionId: number,
        public middleName?: string,
        public secondLastname?: string
    ) {}

    static create(object:{[key:string]:any}):[string?,UpdateUserDto?]{
        const {
            id,
            uuid,
            firstname,
            lastname,
            email,
            address,
            city,
            phoneNumber,
            institutionId,
            middleName,
            secondLastname
        } = object
        
        return [
            undefined,
            new UpdateUserDto(
                id,
                uuid,
                firstname,
                lastname,
                email,
                address,
                city,
                phoneNumber,
                institutionId,
                middleName,
                secondLastname
            )
        ]
    }
}