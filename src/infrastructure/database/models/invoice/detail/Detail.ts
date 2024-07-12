import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { InvoiceSequelize } from "../Invoice"
interface DetailRow {
    id: number,
    uuid: string,
    invoiceId: number,
    mainCode: string,
    auxiliaryCode: string,
    description: string,
    quantity: number,
    unitPrice: number,
    discount: number,
    totalWithoutTaxes: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class DetailSequelize extends Model<DetailRow,Omit<DetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare invoiceId: number
    declare mainCode: string
    declare auxiliaryCode: string
    declare description: string
    declare quantity: number
    declare unitPrice: number
    declare discount: number
    declare totalWithoutTaxes: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

DetailSequelize.init({
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
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: InvoiceSequelize,
            key: 'id'
        }
    },
    mainCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    auxiliaryCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    unitPrice:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    discount:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    totalWithoutTaxes:{
        type: DataTypes.DECIMAL,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "detail",
    timestamps: true,
    paranoid: true
})