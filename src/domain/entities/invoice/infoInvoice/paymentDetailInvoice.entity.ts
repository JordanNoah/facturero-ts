export class PaymentDetailInvoiceEntity {
    constructor(
        public id: number,
        public uuid: string,
        public paymentMethod: string,
        public totalAmount: number,
        public term: number,
        public timeUnit: string,
        public detailInvoiceId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ){}
}