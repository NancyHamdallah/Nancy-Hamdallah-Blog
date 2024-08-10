"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PostCategoryModel_1 = __importDefault(require("./PostCategoryModel"));
const database_1 = __importDefault(require("../config/database"));
//Define a class that extends the Sequelize Model Class
class Category extends sequelize_1.Model {
}
//Initialize the Category model
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryType: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'categories',
    sequelize: database_1.default, // passing the 'sequelize' instance is required
});
// Define association between Post and Category models
Category.hasMany(PostCategoryModel_1.default, { foreignKey: 'categoryId' });
exports.default = Category;
