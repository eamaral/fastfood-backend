const Produto = require('../../domain/Produto');

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar produtos' });
  }
};

// Listar produtos por categoria
exports.listarProdutosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const produtos = await Produto.find({ categoria });
    if (produtos.length === 0) return res.status(404).send({ error: 'Nenhum produto encontrado para essa categoria' });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar produtos por categoria' });
  }
};

// Criar novo produto
exports.criarProduto = async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).send(produto);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar produto' });
  }
};

// Editar produto
exports.editarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).send({ error: 'Produto não encontrado' });
    res.send(produto);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao editar produto' });
  }
};

// Remover produto
exports.removerProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).send({ error: 'Produto não encontrado' });
    res.send({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao remover produto' });
  }
};