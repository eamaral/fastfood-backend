const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  pontos: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cliente', clienteSchema);