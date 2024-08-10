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
exports.deleteComment = exports.updateComment = exports.getComment = exports.getComments = exports.createComment = void 0;
const commentModel_1 = __importDefault(require("../models/commentModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this way didn't work with form-data
    const body = req.body.body;
    const userId = Number(req.body.userId);
    const postId = Number(req.params.postId);
    console.log(`postId = ${postId}`);
    //const {name, email, password} = req.body;
    try {
        const comment = yield commentModel_1.default.create({ body, userId, postId });
        res.status(201).json(comment);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.createComment = createComment;
//get comments for a specific post
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.postId);
        // Fetch categories for the specific post ID
        const comments = yield commentModel_1.default.findAll({
            where: { postId },
            include: [postModel_1.default], // This will include post details if needed
        });
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getComments = getComments;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield commentModel_1.default.findByPk(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        }
        else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getComment = getComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield commentModel_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedComment = yield commentModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedComment);
        }
        else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield commentModel_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Comment deleted' });
        }
        else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteComment = deleteComment;
