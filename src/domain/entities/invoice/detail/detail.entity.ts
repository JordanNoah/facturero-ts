export class DetailEntity {
    constructor(
        public id: number,
        public uuid: string,
        public invoiceId: number,
        public mainCode: string,
        public auxiliaryCode: string,
        public description: string,
        public quantity: number,
        public unitPrice: number,
        public discount: number,
        public totalWithoutTaxes: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ){}
}