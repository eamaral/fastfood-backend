const mercadopago = require('mercadopago');
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  sandbox: true,
});

const ngrokUrl = process.env.NGROK_URL;

/**
 * Função para gerar QR Code usando o Mercado Pago.
 * @param {Object} pedido - Objeto de pedido para gerar o QR Code.
 * @returns {string} URL do QR Code gerado.
 */
exports.gerarQrCodeMercadoPago = async (pedido) => {
  try {
    const buyerEmail = 'TESTUSER874707114@testuser.com';

    const preference = {
      items: [
        {
          title: `Pedido #${pedido._id}`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: pedido.total,
        },
      ],
      payer: {
        email: buyerEmail,
      },
      external_reference: `${pedido._id}`,
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }],
      },
      notification_url: `${ngrokUrl}/api/pagamento/notificacoes`,
      back_urls: {
        success: `${ngrokUrl}/pagamento/sucesso`,
        failure: `${ngrokUrl}/pagamento/erro`,
        pending: `${ngrokUrl}/pagamento/pendente`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    const qrCodeURL = response.body.init_point;
    return qrCodeURL;
  } catch (error) {
    console.error('Erro ao gerar QR code do Mercado Pago:', error);
    throw new Error('Erro ao gerar QR code do Mercado Pago');
  }
};