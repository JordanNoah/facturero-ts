export class InvoiceEntity {
    constructor(
        public id:number,
        public uuid:string,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}
}