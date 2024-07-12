export class UpdateDetailTaxDto {
    constructor(
        public id: number,
        public uuid: string,
        public detailId: number,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public taxableBase: number,
        public value: number,
    ){}

    static create (object:{[key:string]:any}):[string?,UpdateDetailTaxDto?]{
        const {id, uuid, detailId, code, percentageCode, rate, taxableBase, value} = object
        return [
            undefined,
            new UpdateDetailTaxDto(id, uuid, detailId, code, percentageCode, rate, taxableBase, value)
        ]
    }
}