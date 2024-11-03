require('dotenv').config();
const express = require('express');
const connectDB = require('./src/infrastructure/database/database.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const clienteRoutes = require('./src/infrastructure/routes/clienteRoutes.js');
const produtoRoutes = require('./src/infrastructure/routes/produtoRoutes.js');
const pedidoRoutes = require('./src/infrastructure/routes/pedidoRoutes.js');
const pagamentoRoutes = require('./src/infrastructure/routes/pagamentoRoutes.js');

const app = express();
app.use(express.json());

connectDB();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fastfood API',
      version: '1.0.0',
      description: 'API para gerenciamento de pedidos, produtos e pagamentos'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }]
  },
  apis: ['./src/infrastructure/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuração das rotas principais
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pagamento', pagamentoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));