export class UpdateProductDto {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public abbreviation: string,
        public productType: string,
        public price: number,
        public has_iva: boolean,
        public institution_id: number
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateProductDto?]{
        const {
            id,
            uuid,
            name,
            abbreviation,
            productType,
            price,
            has_iva,
            institution_id
        } = object
        return [
            undefined,
            new UpdateProductDto(
                id,
                uuid,
                name,
                abbreviation,
                productType,
                price,
                has_iva,
                institution_id
            )
        ]
    }
}