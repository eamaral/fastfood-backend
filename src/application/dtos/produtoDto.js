class ProdutoDTO {
    constructor({ _id, nome, descricao, preco, categoria }) {
      this.id = _id;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
      this.categoria = categoria;
    }
  }
  module.exports = ProdutoDTO;