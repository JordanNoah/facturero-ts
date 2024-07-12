export class InfoInvoiceEntity {
    constructor(
        public id: number,
        public uuid: string,
        public issuanceDate: string,
        public establishmentAddress: string,
        public specialContributor: string,
        public accountingObligation: string,
        public buyerIdentificationType: string,
        public remissionGuide: string,
        public buyerBusinessName: string,
        public buyerIdentification: string,
        public buyerAddress: string,
        public totalWithoutTaxes: number,
        public totalDiscount: number,
        public tip: number,
        public totalAmount: number,
        public currency: string,
        public vatRetentionValue: number,
        public incomeTaxRetentionValue: number,
        public idInvoice: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ){}
}