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
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this way didn't work with form-data
    const title = req.body.title;
    const body = req.body.body;
    const userId = Number(req.body.userId);
    if (!(title && body && userId))
        res.status(400).send("Missing info");
    //const {name, email, password} = req.body;
    try {
        const post = yield postModel_1.default.create({
            title,
            body,
            userId,
        });
        res.status(201).json(post);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.findAll();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findByPk(req.params.id, {
            include: [
                { model: categoryModel_1.default, through: { attributes: [] } },
            ],
        });
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield postModel_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedPost = yield postModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedPost);
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield postModel_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Post deleted' });
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deletePost = deletePost;
