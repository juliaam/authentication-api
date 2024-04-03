import { Router } from "express";
import UserController from '../controllers/user.js';

const router = Router();

router.get('/:id', UserController.FindById);
router.get('/', UserController.FindAll);
router.patch('/:id', UserController.Update);
router.delete('/:id', UserController.Delete);

export default router;
