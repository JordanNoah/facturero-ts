export class FinancialInformationEntity {
    constructor(
        public id:number,
        public invoiceId:number,
        public environment:number,
        public emissionType:number,
        public businessName:string,
        public tradeName:string,
        public taxpayerId:string,
        public accessKey:string,
        public documentCode:string,
        public establishment:string,
        public pointOfSale:string,
        public sequence:string,
        public address:string,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ){}
}