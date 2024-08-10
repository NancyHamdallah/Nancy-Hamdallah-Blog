"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("./userModel"));
const database_1 = __importDefault(require("../config/database"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
const PostCategoryModel_1 = __importDefault(require("./PostCategoryModel"));
//Define a class that extends the Sequelize Model Class
class Post extends sequelize_1.Model {
}
//Initialize the User model
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    }
}, {
    tableName: 'posts',
    sequelize: database_1.default, // passing the 'sequelize' instance is required
});
// Define association between User and Post models
userModel_1.default.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(userModel_1.default, { foreignKey: 'userId' });
Post.hasMany(PostCategoryModel_1.default, { foreignKey: 'postId' });
Post.belongsToMany(categoryModel_1.default, { through: PostCategoryModel_1.default, foreignKey: 'postId' });
categoryModel_1.default.belongsToMany(Post, { through: PostCategoryModel_1.default, foreignKey: 'categoryId' });
exports.default = Post;
