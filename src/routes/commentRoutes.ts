import {Router} from 'express';
import { createComment, getComments, getComment, updateComment, deleteComment} from '../controllers/commentController';
const router: Router = Router({ mergeParams: true });

router.post('/:postId/comments',createComment);
router.get('/:postId/comments',getComments);
router.get('/:id',getComment);
router.put('/:id',updateComment);
router.delete('/:id',deleteComment);

export default router;