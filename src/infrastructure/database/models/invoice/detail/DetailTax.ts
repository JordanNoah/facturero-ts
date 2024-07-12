import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { DetailSequelize } from "./Detail"

interface DetailTaxRow {
    id: number,
    uuid: string,
    detailId: number,
    code: number,
    percentageCode: number,
    rate: number,
    taxableBase: number,
    value: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class DetailTaxSequelize extends Model<DetailTaxRow,Omit<DetailTaxRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare detailId: number
    declare code: number
    declare percentageCode: number
    declare rate: number
    declare taxableBase: number
    declare value: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

DetailTaxSequelize.init({
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
    code:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    percentageCode:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rate:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    taxableBase:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    value:{
        type: DataTypes.DECIMAL,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "detail_tax",
    timestamps: true,
    paranoid: true
})