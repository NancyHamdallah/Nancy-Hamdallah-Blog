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
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this way didn't work with form-data
    const categoryType = req.body.categoryType;
    const postId = Number(req.params.postId);
    console.log(`postId = ${postId}`);
    //const {name, email, password} = req.body;
    try {
        const category = yield categoryModel_1.default.create({ categoryType });
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* //const categories = await Category.findAll();
        //const category = await Category.findByPk(req.params.postId, {include: [Post]} );
        const postId = Number(req.params.postId);
        // Fetch categories for the specific post ID
        const categories = await Category.findAll({
            where: { postId },
            include: [Post], // This will include post details if needed
          });
        res.status(200).json(categories); */
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getCategories = getCategories;
//get Categories By  Id
/* export const getCategory = async (req:Request, res: Response) : Promise<void> => {
try{
    const category = await Category.findByPk(req.params.postId, {include: [Post]} );
//const category = await Category.findByPk(req.params.id);
if(category) {
res.status(200).json(category);
}else {
res.status(404).json({message: 'Category not found'});
}
}catch(err: any){
res.status(500).json({message : err.message});
}
}; */
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield categoryModel_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedCategory = yield categoryModel_1.default.findByPk(req.params.id);
            res.status(200).json(updatedCategory);
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield categoryModel_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Category deleted' });
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteCategory = deleteCategory;
