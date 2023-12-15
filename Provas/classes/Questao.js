class Questao {
    constructor(id, enunciado,cotacao, tipoQuestao, versao, opcoes) {
      this.id = id;
      this.enunciado = enunciado;
      this.cotacao = cotacao;
      this.tipoQuestao = tipoQuestao;
      this.versao = versao;
      this.opcoes = opcoes || []; // Initialize with an empty array if not provided
    }
}

module.exports = Questao;
