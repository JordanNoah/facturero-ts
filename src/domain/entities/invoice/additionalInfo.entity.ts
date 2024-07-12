export class AdditionalInfoEntity {
    constructor(
        public id:number,
        public uuid:string,
        public keyName:string,
        public keyValue:string,
        public invoiceId:number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ){}
}