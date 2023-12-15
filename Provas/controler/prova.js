const db = require('./connection');

module.exports.getAllProvas = (callback) => {
    const query = 'SELECT * FROM prova';
    db.query(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  };

module.exports.getProvaById = (id, callback) => {
  const query = 'SELECT * FROM prova WHERE id_prova = ' + id+`;`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getVersoesProvaById = (id, callback) => {
  const query = 'SELECT * FROM provaComVersao WHERE id_prova =' +id +`;`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getProvaByIdVersao = (id, versao, callback) => {
  const query = 'SELECT * FROM provaComVersao WHERE id_prova =' +id +' AND nVersao = ' + versao+`;`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getQuestoes = (id, versao, callback) => {
  const query = `
      SELECT q.*, o.*
      FROM questao q
      LEFT JOIN opcao o ON q.id_questao = o.id_questao
      WHERE q.id_prova =`+id+ `AND q.versao = `+versao+`;`;

    db.query(query, [id, versao], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        const questoesMap = new Map();

        results.forEach(questaoData => {
          const questaoId = questaoData.id_questao;

          if (!questoesMap.has(questaoId)) {
            const questao = new Questao(
              questaoData.id_questao,
              questaoData.enunciado,
              questaoData.cotacao,
              questaoData.tipoQuestao,
              questaoData.versao,
              questaoData.id_prova
            );

            questoesMap.set(questaoId, questao);
          }

          // Attach options to the corresponding question
          const opcao = new Opcao(
            questaoData.idopcao,
            questaoData.opcao,
            questaoData.criterio,
            questaoData.cotacao,
            questaoData.id_questao
          );

          questoesMap.get(questaoId).opcoes.push(opcao);
        });

        const questoes = Array.from(questoesMap.values());
        callback(null, questoes);
      }
    });
};

function addOpcao(opcaoData,id_questao) {
  const { id_opcao, opcao, criterio, cotacao } = opcaoData;

  // Insert opcao into the database
  const opcaoInsertQuery = 'INSERT INTO opcao VALUES (?, ?, ?, ?, ?);';
  const opcaoValues = [id_opcao, opcao, criterio, cotacao,id_questao];

  db.query(opcaoInsertQuery, opcaoValues, (err, result) => {
    if (err) {
      console.error('Error inserting opcao:', err);
    }
  });
}

function addQuestao(questaoData,id_prova,nVersao) {
  const { id_questao, enunciado,cotacao, tipoQuestao,opcoes } = questaoData;

  // Insert questao into the database
  const questaoInsertQuery = 'INSERT INTO questao VALUES (?,?, ?, ?, ?,?);';
  const questaoValues = [id_questao, enunciado,cotacao, tipoQuestao,nVersao,id_prova];

  db.query(questaoInsertQuery, questaoValues, (err, result) => {
    if (err) {
      console.error('Error inserting questao:', err);
      return;
    }

    // Insert associated opcoes
    opcoes.forEach(opcaoData => {
      addOpcao(opcaoData,id_questao);
    });
  });
}

function addVersao(versaoData,id_prova,nVersao) {
  const { idSala, hora, questoes } = versaoData;

  // Insert provasComVersao into the database
  const versaoInsertQuery = 'INSERT INTO provaComVersao VALUES (?, ?, ?,?);';
  const versaoValues = [id_prova,nVersao, idSala, hora];

  db.query(versaoInsertQuery, versaoValues, (err, result) => {
    if (err) {
      console.error('Error inserting provaComVersao:', err);
      return;
    }

    // Insert associated questoes and opcoes
    questoes.forEach(questaoData => {
      addQuestao(questaoData,id_prova,nVersao);
    });
  });
}




module.exports.addProva = provaData =>{
  const { id_prova, data, duracao, nVersoes, aleatorio, bloquear, versoes } = provaData;

  // Insert prova into the database
  const provaInsertQuery = 'INSERT INTO prova VALUES (?, ?, ?, ?, ?, ?);';
  const provaValues = [id_prova,data, duracao, nVersoes, aleatorio, bloquear];

  db.query(provaInsertQuery, provaValues, (err, result) => {
    if (err) {
      console.error('Error inserting prova:', err);
      return;
    }


    // Insert associated provasComVersao, questoes, and opcoes
    var i = 1;
    versoes.forEach(versaoData => {
      addVersao(versaoData, id_prova,i++);
    });
  });
}