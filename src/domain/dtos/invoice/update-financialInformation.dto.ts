export class UpdateFinancialInformationDto {
    constructor(
        public id: number,
        public invoiceId: number,
        public environment: number,
        public emissionType: number,
        public businessName: string,
        public tradeName: string,
        public taxpayerId: string,
        public accessKey: string,
        public documentCode: string,
        public establishment: string,
        public pointOfSale: string,
        public sequence: string,
        public address: string
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateFinancialInformationDto?]{
        const {
            id,
            invoiceId,
            environment,
            emissionType,
            businessName,
            tradeName,
            taxpayerId,
            accessKey,
            documentCode,
            establishment,
            pointOfSale,
            sequence,
            address
        } = object
        return [
            undefined,
            new UpdateFinancialInformationDto(
                id,
                invoiceId,
                environment,
                emissionType,
                businessName,
                tradeName,
                taxpayerId,
                accessKey,
                documentCode,
                establishment,
                pointOfSale,
                sequence,
                address
            )
        ]
    }
}