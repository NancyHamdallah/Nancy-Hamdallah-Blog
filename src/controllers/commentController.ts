import {Request, Response} from 'express';
import Comment from '../models/commentModel';
import Post from '../models/postModel'


export const createComment = async (req:Request, res: Response):Promise<void> =>{
// this way didn't work with form-data
    const body : string = req.body.body;
    const userId : number = Number(req.body.userId);
    const postId : number = Number(req.params.postId);
    console.log(`postId = ${postId}`)

//const {name, email, password} = req.body;
try {
const comment = await Comment.create({body,userId,postId});
res.status(201).json(comment);
}catch (err: any){
res.status(500).json({message: err.message});
}
};

//get comments for a specific post

export const getComments = async(req:Request, res: Response): Promise<void> => {
    try{
    const postId = Number(req.params.postId);
    // Fetch categories for the specific post ID
    const comments = await Comment.findAll({
        where: { postId },
        include: [Post], // This will include post details if needed
      });
    res.status(200).json(comments);
    } catch (err: any) {
    res.status(500).json({message: err.message});
    }
    };

export const getComment = async (req:Request, res: Response) : Promise<void> => {
try{
const comment = await Comment.findByPk(req.params.id);
if(comment) {
res.status(200).json(comment);
}else {
res.status(404).json({message: 'Comment not found'});
}
}catch(err: any){
res.status(500).json({message : err.message});
}
};


export const updateComment = async (req:Request, res:Response): Promise<void> => {
try {
const [updated] = await Comment.update(req.body, {
where : {id : req.params.id},
});
if (updated) {
const updatedComment = await Comment.findByPk (req.params.id);
res.status(200).json(updatedComment);
} else {
res.status(404).json({message : 'Comment not found'});
}
} catch (err: any){
res.status(500).json({message : err.message});
}
};

export const deleteComment = async (req:Request, res: Response): Promise<void> => {
try{
const deleted = await Comment.destroy({
where: {id: req.params.id},
});
if(deleted){
res.status(200).json({message: 'Comment deleted'});
}else{
res.status(404).json({message: 'Comment not found'});
}
}catch (err: any){
res.status(500).json({message: err.message});
}
};

