"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("./userModel"));
const database_1 = __importDefault(require("../config/database"));
//Define a class that extends the Sequelize Model Class
class Role extends sequelize_1.Model {
}
//Initialize the User model
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'roles',
    sequelize: database_1.default, // passing the 'sequelize' instance is required
});
// Define association between Post and Comment models
Role.hasMany(userModel_1.default, { foreignKey: 'roleId' });
userModel_1.default.belongsTo(Role, { foreignKey: 'roleId' });
exports.default = Role;
