import { Router } from "express";
import PersonController from '../controllers/person.js';

const router = Router();

router.get('/:id', PersonController.FindById);
router.get('/', PersonController.FindAll);
router.post('/', PersonController.Create);
router.patch('/:id', PersonController.Update);
// router.delete('/:id', PersonController.Delete);

export default router;
