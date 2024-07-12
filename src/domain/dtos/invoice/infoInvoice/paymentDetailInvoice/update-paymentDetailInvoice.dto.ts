export class UpdatePaymentDetailInvoiceDto {
    constructor(
        public id: number,
        public uuid: string,
        public paymentMethod: string,
        public totalAmount: number,
        public term: number,
        public timeUnit: string,
        public detailInvoiceId: number
    ){}

    static create(object:{[key:string]:any}):[string?,updatePaymentDetailInvoiceDto?]{
        const {
            id,
            uuid,
            paymentMethod,
            totalAmount,
            term,
            timeUnit,
            detailInvoiceId
        } = object
        return [
            undefined,
            new updatePaymentDetailInvoiceDto(
                id,
                uuid,
                paymentMethod,
                totalAmount,
                term,
                timeUnit,
                detailInvoiceId
            )
        ]
    }
}