import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"
import { InvoiceSequelize } from "./Invoice"

interface AdditionalInfoRow {
    id: number,
    uuid: string,
    keyName: string,
    keyValue: string,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class AdditionalInfoSequelize extends Model<AdditionalInfoRow,Omit<AdditionalInfoRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare keyName: string
    declare keyValue: string
    declare invoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

AdditionalInfoSequelize.init({
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
    keyName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    keyValue:{
        type: DataTypes.STRING,
        allowNull:false
    },
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: InvoiceSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored:true,
    tableName: "additional_info",
    timestamps: true,
    paranoid: true
})