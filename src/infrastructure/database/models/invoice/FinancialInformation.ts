import { DataTypes, Model, Sequelize } from "sequelize"
import {sequelize} from "../../sequelize";
import { InvoiceSequelize } from "./Invoice";

interface FinancialInformationRow {
    id: number,
    invoiceId: number,
    environment: number,
    emissionType: number,
    businessName: string,
    tradeName: string,
    taxpayerId: string,
    accessKey: string,
    documentCode: string,
    establishment: string,
    pointOfSale: string,
    sequence: string,
    address: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class FinancialInformationSequelize extends Model<FinancialInformationRow,Omit<FinancialInformationRow, 'id'>> {
    declare id: number
    declare invoiceId: number
    declare environment: number
    declare emissionType: number
    declare businessName: string
    declare tradeName: string
    declare taxpayerId: string
    declare accessKey: string
    declare documentCode: string
    declare establishment: string
    declare pointOfSale: string
    declare sequence: string
    declare address: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

FinancialInformationSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    environment:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    emissionType:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    businessName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    tradeName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    taxpayerId:{
        type: DataTypes.STRING,
        allowNull:false
    },
    accessKey:{
        type: DataTypes.STRING,
        allowNull:false
    },
    documentCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    establishment:{
        type: DataTypes.STRING,
        allowNull:false
    },
    pointOfSale:{
        type: DataTypes.STRING,
        allowNull:false
    },
    sequence:{
        type: DataTypes.STRING,
        allowNull:false
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "financial_information",
    timestamps: true,
    paranoid: true
})