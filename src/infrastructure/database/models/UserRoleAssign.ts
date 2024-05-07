import {DataTypes, Model} from "sequelize";
import {UserSequelize} from "./User";
import {sequelize} from "../sequelize";
import {RoleSequelize} from "./Role";

interface UserRoleAssignRow {
    id: number,
    user_id: number,
    role_id: number,
    createdAt?: number,
    updatedAt?: number,
    deletedAt?: number
}

export class UserRoleSequelize extends Model<UserRoleAssignRow,Omit<UserRoleAssignRow, 'id'>> {
    declare id: number
    declare user_id: number
    declare role_id: number
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date
    declare readonly deletedAt?: Date
    declare user: UserSequelize
    declare role: RoleSequelize
}

UserRoleSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: UserSequelize,
            key: 'id',
        }
    },
    role_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: RoleSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored:true,
    tableName: "user_role_assign",
    paranoid: true
})


UserRoleSequelize.belongsTo(UserSequelize,{
    foreignKey: 'user_id',
    as: 'user'
})

UserRoleSequelize.belongsTo(RoleSequelize,{
    foreignKey: 'role_id',
    as: 'role'
})