"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const checkAuth_1 = require("../middleware/checkAuth");
const roleController_1 = __importDefault(require("../controllers/roleController"));
//router.post('/',creatUser);
router.get('/', checkAuth_1.checkAuth, checkAuth_1.checkAdmin, userController_1.getUsers);
router.get('/:id', checkAuth_1.checkAuth, userController_1.getUser);
router.put('/:id', checkAuth_1.checkAuth, userController_1.updateUser);
router.delete('/:id', checkAuth_1.checkAuth, checkAuth_1.checkAdmin, userController_1.deleteUser);
router.post('/role', roleController_1.default);
exports.default = router;
