export class AdditionalDetailDetailEntity {
    constructor(
        public id: number,
        public uuid: string,
        public detailId: number,
        public keyName: string,
        public valueData: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ){}
}