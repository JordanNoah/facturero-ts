export class RegisterPaymentDetailInvoiceDto {
    constructor(
        public paymentMethod: string,
        public totalAmount: number,
        public term: number,
        public timeUnit: string,
        public detailInvoiceId: number
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterPaymentDetailInvoiceDto?]{
        const {
            paymentMethod,
            totalAmount,
            term,
            timeUnit,
            detailInvoiceId
        } = object
        return [
            undefined,
            new RegisterPaymentDetailInvoiceDto(
                paymentMethod,
                totalAmount,
                term,
                timeUnit,
                detailInvoiceId
            )
        ]
    }
}