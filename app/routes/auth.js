import { Router } from "express";
import AuthController from '../controllers/auth.js';

const router = Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.get('/logout', AuthController.LogOut);
router.get('/verify/:id/:token', AuthController.Verify);

/**
 * Rotas de autenticaçao.
 * Os endereços definidos para o objeto Router
 * são relativos a /auth,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: the user to create
 *        schema:
 *          type: object
 *          required: 
 *            - email
 *            - password
 *            - name
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            name:
 *              type: string             
 *     responses:
 *      '201': 
 *       description: Usuário registrado com sucesso
 *      '400':
 *        description: Algo deu errado, não foi possível registrar o usuário
 * /login/{id}:
 *   post:
 *     summary: Loga o usuário
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        name: login
 *        description: Email e senha para autenticação
 *        schema:
 *          type: object
 *          required: 
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string 
 *     responses:
 *       '201':
 *         description: Sucesso ao fazer login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 auth:
 *                   type: boolean
 *       '400':
 *         description: Algo deu errado com essa requisição
 * /logout:
 *   get:
 *     summary: Desloga o usuário
 *     tags: [Auth]
 *     responses:
 *       '201':
 *         description: Sucesso ao deslogar
 *       '400':
 *         description: Algo deu errado com essa requisição
 * /verify/{id}/{token}:
 *   get:
 *     summary: Verifica o usuário com token
 *     tags: [Auth]
 *     responses:
 *       '201':
 *         description: Sucesso ao deslogar
 *       '400':
 *         description: Algo deu errado com essa requisição  
 */

export default router;
