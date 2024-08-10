import {Request, Response} from 'express';
import User from '../models/userModel';
import Post from '../models/postModel';
import PostCategory from '../models/PostCategoryModel';
import Category from '../models/categoryModel';

export const createPost = async (req:Request, res: Response):Promise<void> =>{
// this way didn't work with form-data
    const title : string = req.body.title;
    const body : string = req.body.body;
    const userId : number = Number(req.body.userId);
    if (!(title && body && userId))
        res.status(400).send("Missing info");

//const {name, email, password} = req.body;
try {
    const post = await Post.create(
        {
            title,
            body,
            userId,

        }

    );
res.status(201).json(post);
}catch (err: any){
res.status(500).json({message: err.message});
}
};

export const getPosts = async(req:Request, res: Response): Promise<void> => {
try{
const posts = await Post.findAll();
res.status(200).json(posts);
} catch (err: any) {
res.status(500).json({message: err.message});
}
};


export const getPost = async (req:Request, res: Response) : Promise<void> => {
try{
    const post = await Post.findByPk(req.params.id, {
        include: [
            { model: Category, through: { attributes: [] } },
        ],
    });
if(post) {
res.status(200).json(post);
}else {
res.status(404).json({message: 'Post not found'});
}
}catch(err: any){
res.status(500).json({message : err.message});
}
};


export const updatePost = async (req:Request, res:Response): Promise<void> => {
try {
const [updated] = await Post.update(req.body, {
where : {id : req.params.id},
});
if (updated) {
const updatedPost = await Post.findByPk (req.params.id);
res.status(200).json(updatedPost);
} else {
res.status(404).json({message : 'Post not found'});
}
} catch (err: any){
res.status(500).json({message : err.message});
}
};

export const deletePost = async (req:Request, res: Response): Promise<void> => {
try{
const deleted = await Post.destroy({
where: {id: req.params.id},
});
if(deleted){
res.status(200).json({message: 'Post deleted'});
}else{
res.status(404).json({message: 'Post not found'});
}
}catch (err: any){
res.status(500).json({message: err.message});
}
};

