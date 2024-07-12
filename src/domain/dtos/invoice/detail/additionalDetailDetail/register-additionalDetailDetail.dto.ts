export class RegisterAdditionalDetailDetailDto {
    constructor(
        public detailId: number,
        public keyName: string,
        public valueData: string
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAdditionalDetailDetailDto?]{
        const {detailId, keyName, valueData} = object
        return [
            undefined,
            new RegisterAdditionalDetailDetailDto(detailId, keyName, valueData)
        ]
    }
}