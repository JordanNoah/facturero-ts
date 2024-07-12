export class UpdateInfoInvoiceDto {
    constructor(
        public id: number,
        public uuid: string,
        public issuanceDate: string,
        public establishmentAddress: string,
        public specialContributor: string,
        public accountingObligation: string,
        public buyerIdentificationType: string,
        public remissionGuide: string,
        public buyerBusinessName: string,
        public buyerIdentification: string,
        public buyerAddress: string,
        public totalWithoutTaxes: number,
        public totalDiscount: number,
        public tip: number,
        public totalAmount: number,
        public currency: string,
        public vatRetentionValue: number,
        public incomeTaxRetentionValue: number,
        public idInvoice: number
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateInfoInvoiceDto?]{
        const {
            id,
            uuid,
            issuanceDate,
            establishmentAddress,
            specialContributor,
            accountingObligation,
            buyerIdentificationType,
            remissionGuide,
            buyerBusinessName,
            buyerIdentification,
            buyerAddress,
            totalWithoutTaxes,
            totalDiscount,
            tip,
            totalAmount,
            currency,
            vatRetentionValue,
            incomeTaxRetentionValue,
            idInvoice
        } = object
        return [
            undefined,
            new UpdateInfoInvoiceDto(
                id,
                uuid,
                issuanceDate,
                establishmentAddress,
                specialContributor,
                accountingObligation,
                buyerIdentificationType,
                remissionGuide,
                buyerBusinessName,
                buyerIdentification,
                buyerAddress,
                totalWithoutTaxes,
                totalDiscount,
                tip,
                totalAmount,
                currency,
                vatRetentionValue,
                incomeTaxRetentionValue,
                idInvoice
            )
        ]
    }
}