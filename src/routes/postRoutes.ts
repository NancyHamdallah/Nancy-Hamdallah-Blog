import {Router} from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost} from '../controllers/postController';
const router: Router = Router();
import {checkAuth} from '../middleware/checkAuth'
router.post('/',checkAuth,createPost);
router.get('/',checkAuth,getPosts);
router.get('/:id',checkAuth,getPost);
router.put('/:id',checkAuth,updatePost);
router.delete('/:id',checkAuth,deletePost);

export default router;