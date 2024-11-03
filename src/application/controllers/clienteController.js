const Cliente = require('../../domain/Cliente');
const ClienteDTO = require('../dtos/clienteDto');

// Cadastrar Cliente
exports.cadastrarCliente = async (req, res) => {
  const { cpf, nome, email, telefone } = req.body;
  try {
    if (!cpf) return res.status(400).send({ message: 'CPF é obrigatório' });

    const clienteExistente = await Cliente.findOne({ cpf });
    if (clienteExistente) {
      return res.status(400).send({ message: 'Cliente já cadastrado com esse CPF' });
    }

    const cliente = new Cliente({ _id: cpf, nome, email, telefone });
    await cliente.save();
    res.status(201).send(new ClienteDTO(cliente));
  } catch (error) {
    res.status(500).send({ error: 'Erro ao cadastrar cliente', details: error.message });
  }
};

// Identificar Cliente
exports.identificarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.cpf);
    if (!cliente) return res.status(404).send({ error: 'Cliente não encontrado' });
    res.send(new ClienteDTO(cliente));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Consultar Pontos
exports.consultarPontos = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.cpf);
    if (!cliente) return res.status(404).send({ error: 'Cliente não encontrado' });
    res.status(200).send({ nome: cliente.nome, pontos: cliente.pontos });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao consultar pontos do cliente' });
  }
};