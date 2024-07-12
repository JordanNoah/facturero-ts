export class RegisterFinancialInformationDto {
    constructor(
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
        public address: string,
        public withholdingAgent: number,
        public rimpeTaxpayer: string
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterFinancialInformationDto?]{
        const {
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
            address,
            withholdingAgent,
            rimpeTaxpayer
        } = object
        return [
            undefined,
            new RegisterFinancialInformationDto(
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
                address,
                withholdingAgent,
                rimpeTaxpayer
            )
        ]
    }
}