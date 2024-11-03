class ClienteDTO {
    constructor({ _id, nome, email, telefone, pontos }) {
      this.id = _id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.pontos = pontos;
    }
  }
  module.exports = ClienteDTO;