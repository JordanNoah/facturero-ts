export class UserEntity {
    constructor(
        public id: number,
        public uuid: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public address: string,
        public city: string,
        public phoneNumber: string,
        public institutionId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date,
        public middleName?: string,
        public secondLastname?: string
    ){}
}