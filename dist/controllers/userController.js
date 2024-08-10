"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
exports.createUser = createUser;
const userModel_1 = __importDefault(require("../models/userModel"));
function createUser(req, res, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // this way didn't work with form-data
        const name = req.body.name;
        const email = req.body.email;
        const roleId = Number(req.body.roleId);
        //const {name, email, password} = req.body;
        try {
            const user = yield userModel_1.default.create({ name, email, password, roleId });
            res.status(201).json(user);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.findAll();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield userModel_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedUser = yield userModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield userModel_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteUser = deleteUser;
