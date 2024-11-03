const express = require('express');
const pedidoController = require('../../application/controllers/pedidoController');

const router = express.Router();

/**
 * @swagger
 * /pedidos/andamento:
 *   get:
 *     summary: Lista todos os pedidos com status "Em Preparação"
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos em preparação retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: number
 *                     example: 7043
 *                   clienteId:
 *                     type: string
 *                     example: "34058799811"
 *                   itens:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         produtoId:
 *                           type: string
 *                           example: "01"
 *                         nome:
 *                           type: string
 *                           example: "Hamburguer"
 *                         quantidade:
 *                           type: number
 *                           example: 1
 *                         preco:
 *                           type: number
 *                           example: 15.99
 *                   status:
 *                     type: string
 *                     example: "Em Preparação"
 *                   tempoEstimadoEntrega:
 *                     type: string
 *                     example: "23:22 - 23:32"
 *       404:
 *         description: Nenhum pedido em preparação encontrado
 *       500:
 *         description: Erro ao consultar pedidos
 */
router.get('/andamento', pedidoController.consultarPedidosEmAndamento);

/**
 * @swagger
 * /pedidos/{pedidoId}:
 *   get:
 *     summary: Consulta o andamento de um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido a ser consultado
 *         example: "7043"
 *     responses:
 *       200:
 *         description: Status do pedido consultado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Em Preparação"
 *                 pedidoId:
 *                   type: string
 *                   example: "7043"
 *                 clienteId:
 *                   type: string
 *                   example: "34058799811"
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produtoId:
 *                         type: string
 *                         example: "01"
 *                       nome:
 *                         type: string
 *                         example: "Hamburguer"
 *                       quantidade:
 *                         type: number
 *                         example: 1
 *                       preco:
 *                         type: number
 *                         example: 15.99
 *                 tempoEstimadoEntrega:
 *                   type: string
 *                   example: "23:22 - 23:32"
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao consultar o pedido
 */
router.get('/:pedidoId', pedidoController.consultarPedidoPorId);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar novo pedido (combo)
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: string
 *                       description: ID do produto
 *                       example: "01"
 *                     nome:
 *                       type: string
 *                       description: Nome do produto
 *                       example: "Hamburguer"
 *                     quantidade:
 *                       type: number
 *                       description: Quantidade do produto
 *                       example: 1
 *               clienteId:
 *                 type: string
 *                 description: CPF do cliente
 *                 example: "34058799811"
 *           example:
 *             itens:
 *               - produtoId: "01"
 *                 nome: "Hamburguer"
 *                 quantidade: 1
 *               - produtoId: "02"
 *                 nome: "Batata Frita"
 *                 quantidade: 2
 *               - produtoId: "03"
 *                 nome: "Refrigerante"
 *                 quantidade: 1
 *               - produtoId: "04"
 *                 nome: "Sorvete"
 *                 quantidade: 1
 *             clienteId: "34058799811"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro ao criar pedido
 */
router.post('/', pedidoController.criarPedido);


/**
 * @swagger
 * /pedidos/pronto:
 *   post:
 *     summary: Atualizar pedido para "Pronto para retirada"
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido
 *                 example: "4821"
 *     responses:
 *       200:
 *         description: Pedido atualizado para "Pronto para retirada" e cliente notificado
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao atualizar o pedido
 */
router.post('/pronto', pedidoController.atualizarParaPronto);

/**
 * @swagger
 * /pedidos/finalizar:
 *   post:
 *     summary: Atualizar pedido para "Finalizado"
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido
 *                 example: "4821"
 *     responses:
 *       200:
 *         description: Pedido finalizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao finalizar o pedido
 */
router.post('/finalizar', pedidoController.finalizarPedido);

module.exports = router;