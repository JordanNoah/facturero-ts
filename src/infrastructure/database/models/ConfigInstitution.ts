import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize'; // Import your Sequelize instance
import { InstitutionSequelize } from './Institution';

interface ConfigurationInstitutionRow {
    id: number,
    config_name: string,
    config_value: string,
    institution_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class ConfigurationInstitutionSequelize extends Model<ConfigurationInstitutionRow, Omit<ConfigurationInstitutionRow, 'id'>> {
    declare id: number
    declare config_name: string
    declare config_value: string
    declare institution_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
    declare readonly institution: InstitutionSequelize
}


ConfigurationInstitutionSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    config_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    config_value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    }
}, {
    sequelize,
    underscored: true,
    tableName: "app_configuration",
    timestamps: true,
    paranoid: true
});

ConfigurationInstitutionSequelize.belongsTo(InstitutionSequelize, {
    foreignKey: 'institution_id',
    as: 'institution'
});