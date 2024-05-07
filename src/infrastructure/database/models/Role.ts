import {DataTypes, Model} from "sequelize"
import {sequelize} from "../sequelize"

interface RoleRow {
    id: number,
    uuid: string,
    name: string,
    abbreviation: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class RoleSequelize extends Model<RoleRow,Omit<RoleRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare abbreviation: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

RoleSequelize.init({
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
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    abbreviation:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "Role",
    paranoid: true,
    timestamps: true
})