"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
//create express app
const app = (0, express_1.default)();
//Middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//Routes
app.use('/auth', auth_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/posts', commentRoutes_1.default);
app.use('/api/posts', categoryRoutes_1.default);
//Sync database
database_1.default.sync().then(() => {
    console.log('Database & tables created ');
});
exports.default = app;
