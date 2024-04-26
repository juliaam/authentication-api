import { Router } from "express";
import PersonController from '../controllers/person.js';

const router = Router();

router.get('/:id', PersonController.FindById);
router.get('/', PersonController.FindAll);
router.post('/', PersonController.Create);
router.patch('/:id', PersonController.Update);
// router.delete('/:id', PersonController.Delete);

/**
 * Rotas de pessoa.
 * Os endereços definidos para o objeto Router
 * são relativos a /person,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
 */


/**
 * @swagger
 * /api/person:
 *   get:
 *     summary: Lista todas as Pessoas
 *     tags: [Person]
 *     responses:
 *      '201': 
 *       description: Pessoa obtido com sucesso
 *      '400':
 *        description: Algo deu errado com essa requisição 
 *   patch:
 *     summary: Atualiza uma Pessoa
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *     responses:
 *      '201': 
 *       description: Pessoa atualizada com sucesso
 *      '400':
 *        description: Algo deu errado com essa requisição 
 * /person/{id}:
 *   get:
 *     summary: Obtém pessoa por id
 *     tags: [Person]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id do Pessoa
 *     responses:
 *       201:
 *         description: Pessoa por id
 *       400:
 *         description: Algo deu errado com essa requisição 
 *       404:
 *         description: Não foi possível encontrar a Pessoa
 *   patch:
 *    summary: Atualiza a Pessoa por id
 *    tags: [Person]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id do Pessoa
 *    requestBody:
 *      required: true
 *      content:
 *        application/json
 *    responses:
 *      200:
 *        description: Pessoa foi atualizada com sucesso
 *        content:
 *          application/json
 *      404:
 *        description: Pessoa não encontrado
 *   delete:
 *     summary: Exclui a Pessoa pelo id
 *     tags: [Person]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id de Pessoa
 *
 *     responses:
 *       201:
 *         description: A Pessoa foi excluído com sucesso
 *       404:
 *         description: Livro não encontrado
 *       400:
 *         description: Algo deu errado com essa requisição 
 */

export default router;
