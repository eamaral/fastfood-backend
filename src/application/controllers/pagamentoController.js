const Pedido = require('../../domain/Pedido');
const { gerarQrCodeMercadoPago } = require('../../infrastructure/services/qrCodeService.js');

/**
 * Função para gerar o pagamento e o QR Code via Mercado Pago.
 * @param {Request} req
 * @param {Response} res
 */
exports.gerarPagamento = async (req, res) => {
  const { pedidoId } = req.body;
  try {
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).send({ error: 'Pedido não encontrado' });
    }

    const qrCodeURL = await gerarQrCodeMercadoPago(pedido);
    pedido.qrCode = qrCodeURL;
    await pedido.save();

    res.status(201).send({ qrCode: qrCodeURL });
  } catch (error) {
    console.error('Erro ao gerar QR code:', error);
    res.status(500).send({ error: 'Erro ao gerar QR code' });
  }
};

/**
 * Função para simular um checkout de pagamento.
 * @param {Request} req
 * @param {Response} res
 */
exports.fakeCheckout = async (req, res) => {
  const { pedidoId } = req.body;
  try {
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).send({ error: 'Pedido não encontrado' });
    }

    pedido.status = 'Em Preparação';
    await pedido.save();

    res.status(200).send({
      message: 'Pedido pago com sucesso e está em preparação.',
      pedidoId: pedido._id,
      status: pedido.status
    });
  } catch (error) {
    console.error('Erro ao simular checkout:', error);
    res.status(500).send({ error: 'Erro ao simular checkout' });
  }
};