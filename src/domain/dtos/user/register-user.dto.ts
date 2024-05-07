export class RegisterUserDto {
    constructor(
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

    static create(object:{[key:string]:any}):[string?,RegisterUserDto?]{
        const {
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
        
        if(!firstname) return ['firstname is required']
        if(!lastname) return ['lastname is required']
        if(!email) return ['email is required']
        if(!address) return ['address is required']
        if(!city) return ['city is required']
        if(!phoneNumber) return ['phoneNumber is required']
        if(!institutionId) return ['institutionId is required']
        return [
            undefined,
            new RegisterUserDto(
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