export class UpdateDetailDto {
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
     public totalWithoutTaxes: number
    ){}

    static create (object:{[key:string]:any}):[string?,UpdateDetailDto?]{
        const {id, uuid, invoiceId, mainCode, auxiliaryCode, description, quantity, unitPrice, discount, totalWithoutTaxes} = object
        return [
            undefined,
            new UpdateDetailDto(id, uuid, invoiceId, mainCode, auxiliaryCode, description, quantity, unitPrice, discount, totalWithoutTaxes)
        ]
    }
}