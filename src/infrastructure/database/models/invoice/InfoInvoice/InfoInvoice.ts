import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"
import { InvoiceSequelize } from "../Invoice"

interface InfoInvoiceRow {
    id: number,
    uuid: string,
    issuanceDate: string,
    establishmentAddress: string,
    specialContributor: string,
    accountingObligation: string,
    buyerIdentificationType: string,
    remissionGuide: string,
    buyerBusinessName: string,
    buyerIdentification: string,
    buyerAddress: string,
    totalWithoutTaxes: number,
    totalDiscount: number,
    tip: number,
    totalAmount: number,
    currency: string,
    vatRetentionValue: number,
    incomeTaxRetentionValue: number,
    idInvoice: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InfoInvoiceSequelize extends Model<InfoInvoiceRow,Omit<InfoInvoiceRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare issuanceDate: string
    declare establishmentAddress: string
    declare specialContributor: string
    declare accountingObligation: string
    declare buyerIdentificationType: string
    declare remissionGuide: string
    declare buyerBusinessName: string
    declare buyerIdentification: string
    declare buyerAddress: string
    declare totalWithoutTaxes: number
    declare totalDiscount: number
    declare tip: number
    declare totalAmount: number
    declare currency: string
    declare vatRetentionValue: number
    declare incomeTaxRetentionValue: number
    declare idInvoice: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InfoInvoiceSequelize.init({
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
    issuanceDate:{
        type: DataTypes.DATE,
        allowNull:false
    },
    establishmentAddress:{
        type: DataTypes.STRING,
        allowNull:false
    },
    specialContributor:{
        type: DataTypes.STRING,
        allowNull:false
    },
    accountingObligation:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerIdentificationType:{
        type: DataTypes.STRING,
        allowNull:false
    },
    remissionGuide:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerBusinessName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerIdentification:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerAddress:{
        type: DataTypes.STRING,
        allowNull:false
    },
    totalWithoutTaxes:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    totalDiscount:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    tip:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    totalAmount:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    currency:{
        type: DataTypes.STRING,
        allowNull:false
    },
    vatRetentionValue:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    incomeTaxRetentionValue:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    idInvoice:{
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
    tableName: "info_invoice",
    timestamps: true,
    paranoid: true
})