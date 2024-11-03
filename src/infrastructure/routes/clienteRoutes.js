const express = require('express');
const clienteController = require('../../application/controllers/clienteController');

const router = express.Router();

/**
 * @swagger
 * /clientes/cadastrar:
 *   post:
 *     summary: Cadastrar novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: CPF do cliente (será o _id)
 *                 example: "34058799811"
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: "joao.silva@example.com"
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: "11987654321"
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar cliente
 */
router.post('/cadastrar', clienteController.cadastrarCliente);

/**
 * @swagger
 * /clientes/identificar/{cpf}:
 *   get:
 *     summary: Identificar cliente via CPF
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF do cliente
 *         example: "34058799811"
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/identificar/:cpf', clienteController.identificarCliente);

/**
 * @swagger
 * /clientes/pontos/{cpf}:
 *   get:
 *     summary: Consultar pontos acumulados do cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF do cliente
 *         example: "34058799811"
 *     responses:
 *       200:
 *         description: Retorna o nome do cliente e seus pontos acumulados
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao consultar pontos do cliente
 */
router.get('/pontos/:cpf', clienteController.consultarPontos);

module.exports = router;