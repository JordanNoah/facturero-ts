export class TotalTaxDetailInvoiceEntity {
    constructor(
        public id:number,
        public uuid:string,
        public code:number,
        public percentageCode:number,
        public taxableBase:number,
        public value:number,
        public detailInvoiceId:number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ){}
}