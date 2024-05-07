import { DataTypes, Model } from "sequelize"
import {sequelize} from "../sequelize";
import {InstitutionSequelize} from "./Institution";

interface UserRow {
    id: number,
    uuid: string,
    firstname: string,
    middle_name?: string,
    lastname: string,
    second_lastname?: string,
    email: string,
    address: string,
    city: string,
    phone_number: string,
    institution_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class UserSequelize extends Model<UserRow,Omit<UserRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare firstname: string
    declare middle_name: string
    declare lastname: string
    declare second_lastname: string
    declare email: string
    declare address: string
    declare city: string
    declare phone_number: string
    declare institution_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

UserSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull:false
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    middle_name:{
        type: DataTypes.STRING,
        allowNull:true
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    second_lastname:{
        type: DataTypes.STRING,
        allowNull:true
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    city:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    institution_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored:true,
    tableName: "user",
    paranoid: true,
    timestamps: true
})