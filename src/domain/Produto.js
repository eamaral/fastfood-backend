const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true, enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'] }
});

module.exports = mongoose.model('Produto', produtoSchema);