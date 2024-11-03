const Pedido = require('../../domain/Pedido');
const Produto = require('../../domain/Produto');
const Cliente = require('../../domain/Cliente');
const PedidoDTO = require('../dtos/pedidoDto');
const { enviarNotificacaoDePronto, enviarNotificacaoDePontos } = require('../../infrastructure/services/notificationService');

// Função para calcular o total do pedido diretamente na controller
async function calcularTotalPedido(itens) {
  let total = 0;
  for (const item of itens) {
    const produto = await Produto.findById(item.produtoId);
    if (produto) {
      total += produto.preco * item.quantidade;
    }
  }
  return total;
}

// Criar Pedido
exports.criarPedido = async (req, res) => {
  try {
    const { itens, clienteId } = req.body;
    const total = await calcularTotalPedido(itens);

    const pedido = new Pedido({ itens, clienteId, total });
    await pedido.save();

    res.status(201).send(new PedidoDTO(pedido));
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(400).send({ error: 'Erro ao criar pedido' });
  }
};

// Consultar Pedido por ID
exports.consultarPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.pedidoId);
    if (!pedido) return res.status(404).send({ error: 'Pedido não encontrado' });
    res.send(new PedidoDTO(pedido));
  } catch (error) {
    res.status(500).send({ error: 'Erro ao consultar pedido' });
  }
};

// Consultar Pedidos em Andamento
exports.consultarPedidosEmAndamento = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ status: 'Em Preparação' });
    res.status(200).json(pedidos.map((pedido) => new PedidoDTO(pedido)));
  } catch (error) {
    res.status(500).send({ error: 'Erro ao consultar pedidos em andamento' });
  }
};

// Atualizar Pedido para "Pronto para Retirada"
exports.atualizarParaPronto = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.body.pedidoId);
    if (!pedido) return res.status(404).send({ error: 'Pedido não encontrado' });

    pedido.status = 'Pronto para Retirada';
    await pedido.save();

    const cliente = await Cliente.findById(pedido.clienteId);
    if (cliente) {
      await enviarNotificacaoDePronto(cliente._id);
      res.send({
        message: 'Pedido atualizado para pronto para retirada, cliente notificado por email',
        pedidoId: pedido._id
      });
    } else {
      console.error('Cliente não encontrado no sistema');
      res.status(404).send({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o pedido:', error);
    res.status(500).send({ error: 'Erro ao atualizar o pedido' });
  }
};

// Finalizar Pedido e Atualizar Pontos do Cliente
exports.finalizarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.body.pedidoId);
    if (!pedido) return res.status(404).send({ error: 'Pedido não encontrado' });

    pedido.status = 'Finalizado';
    await pedido.save();

    const cliente = await Cliente.findById(pedido.clienteId);
    if (cliente) {
      // Incrementa os pontos do cliente
      cliente.pontos += 1;

      // Verifica se o cliente atingiu 10 pontos
      if (cliente.pontos >= 10) {
        await enviarNotificacaoDePontos(
          cliente.email,
          `Parabéns, ${cliente.nome}! Você acumulou 10 pontos e o próximo pedido é por nossa conta!`
        );
        cliente.pontos = 0; // Reseta os pontos para 0
      } else {
        await enviarNotificacaoDePontos(
          cliente.email,
          `Olá, ${cliente.nome}! Você agora tem ${cliente.pontos} pontos. Ao acumular 10 pontos, o próximo pedido é por nossa conta!`
        );
      }

      // Salva o cliente com os pontos atualizados
      await cliente.save();
    }

    res.send({ message: 'Pedido finalizado com sucesso e pontos atualizados', pedidoId: pedido._id });
  } catch (error) {
    console.error('Erro ao finalizar o pedido:', error);
    res.status(500).send({ error: 'Erro ao finalizar o pedido' });
  }
};