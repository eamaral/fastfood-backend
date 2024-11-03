const mongoose = require('mongoose');


// Gera ID de 4 dígitos
function gerarIdPedido() {
  return Math.floor(1000 + Math.random() * 9000);
}

const pedidoSchema = new mongoose.Schema({
  _id: { type: Number, default: gerarIdPedido },
  itens: [
    {
      produtoId: String,
      nome: String,
      quantidade: Number,
      preco: Number
    }
  ],
  clienteId: { type: String, required: true },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Recebido', 'Em Preparação', 'Pronto para Retirada', 'Finalizado'], 
    default: 'Recebido' 
  },
  qrCode: { type: String }
});

module.exports = mongoose.model('Pedido', pedidoSchema);