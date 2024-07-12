export class DetailTaxEntity {
    constructor(
        public id: number,
        public uuid: string,
        public detailId: number,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public taxableBase: number,
        public value: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ){}
}