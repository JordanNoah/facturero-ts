export class UpdateAdditionalDetailDetailDto {
    constructor(
        public id: number,
        public uuid: string,
        public detailId: number,
        public keyName: string,
        public valueData: string,
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateAdditionalDetailDetailDto?]{
        const {
            id,
            uuid,
            detailId,
            keyName,
            valueData
        } = object
        return [
            undefined,
            new UpdateAdditionalDetailDetailDto(
                id,
                uuid,
                detailId,
                keyName,
                valueData
            )
        ]
    }
}