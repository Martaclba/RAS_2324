var express = require('express');
var router = express.Router();
var Prova = require('../controler/prova')

/* GET home page. */
router.get('/', function (req, res, next) {
  Prova.getAllProvas((err, provas) => {
    if (err) {
      res.status(601).json({ message: "Erro a obter lista de provas", error: err });
    } else {
      res.json(provas);
    }
  });
});





router.get('/:id/versao/:versao', function (req, res, next) {
  Prova.getProvaByIdVersao(req.params.id, req.params.versao,(err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter prova", error: err });
    } else {
      const prova = new Prova(
        provaData.id_prova,
        provaData.data,
        provaData.duracao,
        provaData.nVersoes,
        provaData.aleatorio,
        provaData.bloquear,
        provaData.tempoAdmissao
      );
      res.json(prova)
    }
  });
});

router.get('/:id', function (req, res, next) {
  Prova.getProvaById(req.params.id, (err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter prova", error: err });
    } else {
      const prova = new Prova(
        provaData.id_prova,
        provaData.data,
        provaData.duracao,
        provaData.nVersoes,
        provaData.aleatorio,
        provaData.bloquear,
        provaData.tempoAdmissao
      );
      res.json(prova)
    }
  });
});


router.post('/', function (req, res, next) {
  const provas = req.body.provas; // Assuming provas is an array in req.body
  if (!provas || !Array.isArray(provas)) {
    return res.status(400).json({ message: 'Invalid request body format' });
  }
  provas.forEach(prova => {
    Prova.addProva(prova);
  });

  res.json({ message: 'Provas added successfully' });
});


module.exports = router;
