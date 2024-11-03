const express = require('express');
const pagamentoController = require('../../application/controllers/pagamentoController');

const router = express.Router();

/**
 * @swagger
 * /pagamento/gerar:
 *   post:
 *     summary: Gera um QR Code para pagamento via Mercado Pago.
 *     tags:
 *       - Pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido para o qual o QR Code será gerado.
 *                 example: "6358"
 *     responses:
 *       '201':
 *         description: QR Code gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCode:
 *                   type: string
 *                   description: URL do QR Code gerado.
 *       '404':
 *         description: Pedido não encontrado.
 *       '500':
 *         description: Erro ao gerar QR code.
 */
router.post('/gerar', pagamentoController.gerarPagamento);

/**
 * @swagger
 * /pagamento/fake-checkout:
 *   post:
 *     summary: Simula um checkout para pagamento de um pedido.
 *     tags:
 *       - Pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido a ser marcado como pago e em preparação.
 *                 example: "6358"
 *     responses:
 *       '200':
 *         description: Pedido marcado como pago e em preparação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido pago com sucesso e está em preparação."
 *                 pedidoId:
 *                   type: string
 *                   example: "6358"
 *                 status:
 *                   type: string
 *                   example: "Em Preparação"
 *       '400':
 *         description: pedidoId inválido ou não fornecido.
 *       '404':
 *         description: Pedido não encontrado.
 *       '500':
 *         description: Erro ao simular checkout.
 */
router.post('/fake-checkout', pagamentoController.fakeCheckout);

module.exports = router;