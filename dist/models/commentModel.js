"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("./userModel"));
const postModel_1 = __importDefault(require("./postModel"));
const database_1 = __importDefault(require("../config/database"));
//Define a class that extends the Sequelize Model Class
class Comment extends sequelize_1.Model {
}
//Initialize the Comment model
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    }
}, {
    tableName: 'comments',
    sequelize: database_1.default, // passing the 'sequelize' instance is required
});
// Define association between User and Comment models
userModel_1.default.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(userModel_1.default, { foreignKey: 'userId' });
// Define association between Post and Comment models
postModel_1.default.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(postModel_1.default, { foreignKey: 'postId' });
exports.default = Comment;
