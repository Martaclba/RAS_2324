class Prova {
    constructor(id,data, duracao, nVersoes, aleatorio, bloquear, versoes) {
      this.id = id;
      this.data = data;
      this.duracao = duracao;
      this.nVersoes = nVersoes;
      this.aleatorio = aleatorio;
      this.bloquear = bloquear;
      this.versoes = Array.isArray(versoes) ? versoes : [];
    }
}

module.exports = Prova;
