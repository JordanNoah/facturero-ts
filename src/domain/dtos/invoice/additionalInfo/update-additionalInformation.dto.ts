export class UpdateAdditionalInfoDto {
    constructor(
        public invoiceId: number,
        public uuid: string,
        public keyName: string,
        public keyValue: string
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateAdditionalInfoDto?]{
        const {
            invoiceId,
            uuid,
            keyName,
            keyValue
        } = object
        return [
            undefined,
            new UpdateAdditionalInfoDto(
                invoiceId,
                uuid,
                keyName,
                keyValue
            )
        ]
    }
}