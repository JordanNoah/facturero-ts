export class RegisterAdditionalInformationDto {
    constructor(
        public invoiceId: number,
        public keyName: string,
        public keyValue: string
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAdditionalInformationDto?]{
        const {
            invoiceId,
            keyName,
            keyValue
        } = object
        return [
            undefined,
            new RegisterAdditionalInformationDto(
                invoiceId,
                keyName,
                keyValue
            )
        ]
    }
}