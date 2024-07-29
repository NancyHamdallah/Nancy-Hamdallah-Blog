import {Request, Response} from 'express';
import Category from '../models/categoryModel';
import Post from '../models/postModel'


export const createCategory = async (req:Request, res: Response):Promise<void> =>{
// this way didn't work with form-data
    const categoryType: string = req.body.categoryType;
    const postId : number = Number(req.params.postId);
    console.log(`postId = ${postId}`)

//const {name, email, password} = req.body;
try {
const category = await Category.create({categoryType,postId});
res.status(201).json(category);
}catch (err: any){
res.status(500).json({message: err.message});
}
};

export const getCategories = async(req:Request, res: Response): Promise<void> => {
try{
//const categories = await Category.findAll();
//const category = await Category.findByPk(req.params.postId, {include: [Post]} );
const postId = Number(req.params.postId);
// Fetch categories for the specific post ID
const categories = await Category.findAll({
    where: { postId },
    include: [Post], // This will include post details if needed
  });
res.status(200).json(categories);
} catch (err: any) {
res.status(500).json({message: err.message});
}
};

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


export const updateCategory = async (req:Request, res:Response): Promise<void> => {
try {
const [updated] = await Category.update(req.body, {
where : {id : req.params.id},
});
if (updated) {
const updatedCategory = await Category.findByPk (req.params.id);
res.status(200).json(updatedCategory);
} else {
res.status(404).json({message : 'Category not found'});
}
} catch (err: any){
res.status(500).json({message : err.message});
}
};

export const deleteCategory = async (req:Request, res: Response): Promise<void> => {
try{
const deleted = await Category.destroy({
where: {id: req.params.id},
});
if(deleted){
res.status(200).json({message: 'Category deleted'});
}else{
res.status(404).json({message: 'Category not found'});
}
}catch (err: any){
res.status(500).json({message: err.message});
}
};

