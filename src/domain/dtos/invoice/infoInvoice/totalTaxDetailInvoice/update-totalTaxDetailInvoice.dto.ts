export class UpdateTotalTaxDetailInvoiceDto {
    constructor(
        public id: number,
        public code: number,
        public percentageCode: number,
        public taxableBase: number,
        public value: number,
        public detailInvoiceId: number
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateTotalTaxDetailInvoiceDto?]{
        const {
            id,
            code,
            percentageCode,
            taxableBase,
            value,
            detailInvoiceId
        } = object
        return [
            undefined,
            new UpdateTotalTaxDetailInvoiceDto(
                id,
                code,
                percentageCode,
                taxableBase,
                value,
                detailInvoiceId
            )
        ]
    }
}