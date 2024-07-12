import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { InfoInvoiceSequelize } from "./InfoInvoice"

interface PaymentDetailInvoiceRow {
    id: number,
    uuid: string,
    paymentMethod: string,
    totalAmount: number,
    term: number,
    timeUnit: string,
    detailInvoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class PaymentDetailInvoiceSequelize extends Model<PaymentDetailInvoiceRow,Omit<PaymentDetailInvoiceRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare paymentMethod: string
    declare totalAmount: number
    declare term: number
    declare timeUnit: string
    declare detailInvoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

PaymentDetailInvoiceSequelize.init({
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
    paymentMethod:{
        type: DataTypes.STRING,
        allowNull:false
    },
    totalAmount:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    term:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    timeUnit:{
        type: DataTypes.STRING,
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
    tableName: "payment_detail_invoice",
    timestamps: true,
    paranoid: true
})