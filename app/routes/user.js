import { Router } from "express";
import UserController from '../controllers/user.js';

const router = Router();

router.get('/:id', UserController.FindById);
router.get('/', UserController.FindAll);
router.patch('/:id', UserController.Update);
router.delete('/:id', UserController.Delete);

/**
 * Rotas de usuários.
 * Os endereços definidos para o objeto Router
 * são relativos a /users,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *      '201': 
 *       description: Usuário obtida com sucesso
 *      '400':
 *        description: Algo deu errado com essa requisição 
 *   patch:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *     responses:
 *      '201': 
 *       description: Usuário atualizado com sucesso
 *      '400':
 *        description: Algo deu errado com essa requisição 
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id do usuário
 *     responses:
 *       201:
 *         description: O usuário por id
 *       400:
 *         description: Algo deu errado com essa requisição 
 *       404:
 *         description: Não foi possível encontrar o usuário
 *   patch:
 *    summary: Atualiza o usuário por id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id do usuário
 *    requestBody:
 *      required: true
 *      content:
 *        application/json
 *    responses:
 *      200:
 *        description: O usuário foi atualizado com sucesso
 *        content:
 *          application/json
 *      404:
 *        description: Usuário não encontrado
 *   delete:
 *     summary: Exclui o usuário pelo id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id do usuário
 *
 *     responses:
 *       201:
 *         description: O usuário foi excluído com sucesso
 *       404:
 *         description: Livro não encontrado
 *       400:
 *         description: Algo deu errado com essa requisição 
 */

export default router;
