class PedidoDto {
    constructor(pedido) {
      this._id = pedido._id;
      this.clienteId = pedido.clienteId;
      this.itens = pedido.itens;
      this.total = pedido.total;
      this.status = pedido.status;
    }
  }
  
  module.exports = PedidoDto;