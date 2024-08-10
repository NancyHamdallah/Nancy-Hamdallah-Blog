"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("./dotenv"));
const sequelize = new sequelize_1.Sequelize(dotenv_1.default.DB_NAME, dotenv_1.default.DB_USER, dotenv_1.default.DB_PASSWORD, {
    host: dotenv_1.default.DB_HOST,
    dialect: "mysql"
});
exports.default = sequelize;
