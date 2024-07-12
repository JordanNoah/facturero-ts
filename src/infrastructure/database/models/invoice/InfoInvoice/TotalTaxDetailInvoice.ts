import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { InfoInvoiceSequelize } from "./InfoInvoice"
interface TotalTaxDetailInvoiceRow {
    id: number,
    uuid: string,
    code: number,
    percentageCode: number,
    taxableBase: number,
    value: number,
    detailInvoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class TotalTaxDetailInvoiceSequelize extends Model<TotalTaxDetailInvoiceRow,Omit<TotalTaxDetailInvoiceRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare code: number
    declare percentageCode: number
    declare taxableBase: number
    declare value: number
    declare detailInvoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

TotalTaxDetailInvoiceSequelize.init({
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
    code:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    percentageCode:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    taxableBase:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    value:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    detailInvoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: InfoInvoiceSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored:true,
    tableName: "total_tax_detail_invoice",
    timestamps: true,
    paranoid: true
})