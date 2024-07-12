export class RegisterTotalTaxDetailInvoiceDto {
    constructor(
        public code: number,
        public percentageCode: number,
        public taxableBase: number,
        public value: number,
        public detailInvoiceId: number
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterTotalTaxDetailInvoiceDto?]{
        const {
            code,
            percentageCode,
            taxableBase,
            value,
            detailInvoiceId
        } = object
        return [
            undefined,
            new RegisterTotalTaxDetailInvoiceDto(
                code,
                percentageCode,
                taxableBase,
                value,
                detailInvoiceId
            )
        ]
    }
}