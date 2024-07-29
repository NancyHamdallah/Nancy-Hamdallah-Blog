import {Router} from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory} from '../controllers/categoryController';
const router: Router = Router({ mergeParams: true });

router.post('/:postId/categories',createCategory);
router.get('/:postId/categories',getCategories);
//router.get('/:id',getCategory);
router.put('/:id',updateCategory);
router.delete('/:id',deleteCategory);

export default router;