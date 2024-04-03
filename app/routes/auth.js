import { Router } from "express";
import AuthController from '../controllers/auth.js';

const router = Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.post('/logout', AuthController.LogOut);

export default router;
