import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { DetailSequelize } from "./Detail"
interface AdditionalDetailRow {
    id: number,
    uuid: string,
    detailId: number,
    keyName: string,
    valueData: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class AdditionalDetailSequelize extends Model<AdditionalDetailRow,Omit<AdditionalDetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare detailId: number
    declare keyName: string
    declare valueData: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

AdditionalDetailSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    detailId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: DetailSequelize,
            key: 'id'
        }
    },
    keyName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    valueData:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "additional_details_detail",
    timestamps: true,
    paranoid: true
})