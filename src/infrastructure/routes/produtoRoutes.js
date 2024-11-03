const express = require('express');
const produtoController = require('../../application/controllers/produtoController');

const router = express.Router();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *                 example: "Hamburguer"
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *                 example: "Delicioso hamburguer de carne com queijo"
 *               preco:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 15.99
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *                 example: "Lanche"
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do produto
 *                 example: "http://exemplo.com/imagem.jpg"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do produto
 *                   example: "01"
 *                 nome:
 *                   type: string
 *                   example: "Hamburguer"
 *                 descricao:
 *                   type: string
 *                   example: "Delicioso hamburguer de carne com queijo"
 *                 preco:
 *                   type: number
 *                   example: 15.99
 *                 categoria:
 *                   type: string
 *                   example: "Lanche"
 *                 imagem:
 *                   type: string
 *                   example: "http://exemplo.com/imagem.jpg"
 *       400:
 *         description: Erro ao criar produto
 */
router.post('/', produtoController.criarProduto);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar todos os produtos disponíveis
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos disponível
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "01"
 *                   nome:
 *                     type: string
 *                     example: "Hamburguer"
 *                   descricao:
 *                     type: string
 *                     example: "Delicioso hamburguer de carne com queijo"
 *                   preco:
 *                     type: number
 *                     example: 15.99
 *                   categoria:
 *                     type: string
 *                     example: "Lanche"
 *       500:
 *         description: Erro ao buscar produtos
 */
router.get('/', produtoController.listarProdutos);

/**
 * @swagger
 * /produtos/categoria/{categoria}:
 *   get:
 *     summary: Listar produtos por categoria
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoria do produto (Lanche, Acompanhamento, Bebida, Sobremesa)
 *         example: "Lanche"
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria selecionada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "01"
 *                   nome:
 *                     type: string
 *                     example: "Hamburguer"
 *                   descricao:
 *                     type: string
 *                     example: "Delicioso hamburguer de carne com queijo"
 *                   preco:
 *                     type: number
 *                     example: 15.99
 *                   categoria:
 *                     type: string
 *                     example: "Lanche"
 *       404:
 *         description: Nenhum produto encontrado para essa categoria
 *       500:
 *         description: Erro ao buscar produtos por categoria
 */
router.get('/categoria/:categoria', produtoController.listarProdutosPorCategoria);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Editar produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [Lanche, Acompanhamento, Bebida, Sobremesa]
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Erro ao editar produto
 */
router.put('/:id', produtoController.editarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remover produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', produtoController.removerProduto);

module.exports = router;