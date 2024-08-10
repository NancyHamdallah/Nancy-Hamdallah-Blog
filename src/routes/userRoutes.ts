import {Router} from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser} from '../controllers/userController';
const router: Router = Router();
import {checkAdmin, checkAuth} from '../middleware/checkAuth'
import createRole from '../controllers/roleController'
//router.post('/',creatUser);
router.get('/',checkAuth,checkAdmin,getUsers);
router.get('/:id',checkAuth,getUser);
router.put('/:id',checkAuth,updateUser);
router.delete('/:id',checkAuth,checkAdmin,deleteUser);
router.post('/role',createRole);

export default router;