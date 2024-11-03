const nodemailer = require('nodemailer');
const Cliente = require('../../domain/Cliente');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.enviarNotificacaoDePronto = async (clienteId) => {
  try {
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      console.error('Cliente não encontrado');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: cliente.email,
      subject: 'Pedido Pronto',
      text: `Olá, ${cliente.nome}! O seu pedido está pronto para retirada!`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${cliente.email}`);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
};

exports.enviarNotificacaoDePontos = async (email, mensagem) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Atualização de Pontos',
      text: mensagem
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${email} com a contagem de pontos`);
  } catch (error) {
    console.error('Erro ao enviar notificação de pontos:', error);
  }
};