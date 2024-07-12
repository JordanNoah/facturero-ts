export class RegisterDetailDto {
    constructor(
    public invoiceId: number,
    public mainCode: string,
    public auxiliaryCode: string,
    public description: string,
    public quantity: number,
    public unitPrice: number,
    public discount: number,
    public totalWithoutTaxes: number
    ){}

    static create (object:{[key:string]:any}):[string?,RegisterDetailDto?]{
        const {invoiceId, mainCode, auxiliaryCode, description, quantity, unitPrice, discount, totalWithoutTaxes} = object
        return [
            undefined,
            new RegisterDetailDto(invoiceId, mainCode, auxiliaryCode, description, quantity, unitPrice, discount, totalWithoutTaxes)
        ]
    }
}