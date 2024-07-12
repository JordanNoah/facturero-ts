export class RegisterDetailTaxDto{
    constructor(
        public detailId: number,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public taxableBase: number,
        public value: number
    ){}

    static create (object:{[key:string]:any}):[string?,RegisterDetailTaxDto?]{
        const {detailId, code, percentageCode, rate, taxableBase, value} = object
        return [
            undefined,
            new RegisterDetailTaxDto(detailId, code, percentageCode, rate, taxableBase, value)
        ]
    }
}