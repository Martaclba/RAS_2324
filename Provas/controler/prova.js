const db = require('./connection');
const Questao = require('../classes/Questao');
const Opcao = require('../classes/Opcao');

function deleteQuestao(idQuestao, callback) {

  const opcaoDeleteQuery = `DELETE FROM opcao WHERE id_questao = '${idQuestao}';`;

  db.query(opcaoDeleteQuery, (errOpcao, resultOpcao) => {
    if (errOpcao) {
      console.error('Error deleting opcoes:', errOpcao);
      callback(errOpcao, null);
    } else {
      const questaoDeleteQuery = `DELETE FROM questao WHERE id_questao = '${idQuestao}';`;

      db.query(questaoDeleteQuery, (errQuestao, resultQuestao) => {
        if (errQuestao) {
          console.error('Error deleting questao:', errQuestao);
          callback(errQuestao, null);
        } else {
          callback(null, resultQuestao);
        }
      });
    }
  });
}

function deleteProvaComVersao(idProva, versao, callback) {
  const questoesSelectQuery = `
    SELECT id_questao FROM questao 
    WHERE id_prova = '${idProva}' AND nVersao = ${versao};
  `;

  db.query(questoesSelectQuery, (errQuestoes, resultQuestoes) => {
    if (errQuestoes) {
      console.error('Error retrieving questao IDs:', errQuestoes);
      callback(errQuestoes, null);
    } else {
      const questoesIds = resultQuestoes.map(questao => questao.id_questao);

      questoesIds.forEach(idQuestao => {
        deleteQuestao(idQuestao, () => {
        });
      });

      const decrementVersoesQuery = `
        UPDATE prova SET nVersoes = nVersoes - 1 WHERE id_prova = '${idProva}';
      `;

      db.query(decrementVersoesQuery, (errDecrement, resultDecrement) => {
        if (errDecrement) {
          console.error('Error decrementing the number of versions:', errDecrement);
          callback(errDecrement, null);
        } else {
          const provaComVersaoDeleteQuery = `
            DELETE FROM provaComVersao WHERE id_prova = '${idProva}' AND nVersao = ${versao};
          `;

          db.query(provaComVersaoDeleteQuery, (errDelete, resultDelete) => {
            if (errDelete) {
              console.error('Error deleting provaComVersao:', errDelete);
              callback(errDelete, null);
            } else {
              callback(null, resultDelete);
            }
          });
        }
      });
    }
  });
}


module.exports.deleteOpcao = (idOpcao, callback) => {
  const opcaoSelectQuery = `SELECT * FROM opcao WHERE idopcao = '${idOpcao}';`;

  db.query(opcaoSelectQuery, (errSelect, resultSelect) => {
    if (errSelect) {
      console.error('Error checking opcao existence:', errSelect);
      callback(errSelect, null);
    } else {
      if (resultSelect.length === 0) {
        callback(null, { status: 'Opcao not found' });
      } else {
        const opcaoDeleteQuery = `DELETE FROM opcao WHERE idopcao = '${idOpcao}';`;

        db.query(opcaoDeleteQuery, [idOpcao], (errDelete, resultDelete) => {
          if (errDelete) {
            console.error('Error deleting opcao:', errDelete);
            callback(errDelete, null);
          } else {
            callback(null, { status: 'Opcao deleted successfully' });
          }
        });
      }
    }
  });
}

module.exports.deleteQuestao = deleteQuestao;

module.exports.deleteProvaComVersao = deleteProvaComVersao;

module.exports.deleteProva = (idProva, callback) => {
  const versoesSelectQuery = `
    SELECT nVersao FROM provaComVersao 
    WHERE id_prova = '${idProva}';
  `;

  db.query(versoesSelectQuery, (errVersoes, resultVersoes) => {
    if (errVersoes) {
      console.error('Error retrieving prova versions:', errVersoes);
      callback(errVersoes, null);
    } else {
      const versoes = resultVersoes.map((versao) => versao.nVersao);

      const deleteNextVersion = (index) => {
        if (index < versoes.length) {
          deleteProvaComVersao(idProva, versoes[index], (err, result) => {
            if (err) {
              console.error('Error deleting version:', err);
              callback(err, null);
            } else {
              deleteNextVersion(index + 1);
            }
          });
        } else {
          const provaDeleteQuery = `DELETE FROM prova WHERE id_prova = '${idProva}';`;

          db.query(provaDeleteQuery, (errDeleteProva, resultDeleteProva) => {
            if (errDeleteProva) {
              console.error('Error deleting prova:', errDeleteProva);
              callback(errDeleteProva, null);
            } else {
              callback(null, resultDeleteProva);
            }
          });
        }
      };

      deleteNextVersion(0);
    }
  });
};


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
  const query = `
    SELECT p.*, v.*
    FROM prova p
    LEFT JOIN provaComVersao v ON p.id_prova = v.id_prova
    WHERE p.id_prova = '${id}';
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results)
      const provaInfo = {
        id_prova: results[0].id_prova,
        data: results[0].data,
        duracao: results[0].duracao,
        nVersoes: results[0].nVersoes,
        aleatorio: results[0].aleatorio,
        bloquear: results[0].bloquear,
        versoes: results.map((result) => ({
          nVersao: result.nVersao,
          idSala: result.idSala,
          hora: result.hora,
        })),
      };

      callback(null, provaInfo);
    }
  });
};


module.exports.getVersoesProvaById = (id, callback) => {
  const query = `SELECT * FROM provaComVersao WHERE id_prova = '${id}';`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getProvaByIdVersao = (id, versao, callback) => {
  const query = `SELECT * FROM provaComVersao WHERE id_prova = '${id}' AND nVersao = '${versao}';`;
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
      WHERE q.id_prova = '${id}' AND q.nVersao = '${versao}';`;

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
              questaoData.cotacao_questao,
              questaoData.tipoQuestao,
              questaoData.nVersao,
              questaoData.id_prova,
              []
            );

            questoesMap.set(questaoId, questao);

          }
          const opcao = new Opcao(
            questaoData.idopcao,
            questaoData.opcao,
            questaoData.criterio,
            questaoData.cotacao_opcao,
            questaoData.id_questao
          );

          questoesMap.get(questaoId).opcoes.push(opcao);

        });

        const questoes = Array.from(questoesMap.values());
        callback(null, questoes);
      }
    });
};

module.exports.getQuestaoById = (idProva, versao, idQuestao, callback) => {
  const query = `
    SELECT q.*, o.*
    FROM questao q
    LEFT JOIN opcao o ON q.id_questao = o.id_questao
    WHERE q.id_prova = '${idProva}' AND q.nVersao = '${versao}' AND q.id_questao = '${idQuestao}';
  `;

  db.query(query, [idProva, versao, idQuestao], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const questaoMap = new Map();

      results.forEach(questaoData => {
        const questaoId = questaoData.id_questao;

        if (!questaoMap.has(questaoId)) {
          const questao = new Questao(
            questaoData.id_questao,
            questaoData.enunciado,
            questaoData.cotacao,
            questaoData.tipoQuestao,
            questaoData.versao,
            questaoData.id_prova
          );

          questaoMap.set(questaoId, questao);
        }

        const opcao = new Opcao(
          questaoData.idopcao,
          questaoData.opcao,
          questaoData.criterio,
          questaoData.cotacao,
          questaoData.id_questao
        );

        questaoMap.get(questaoId).opcoes.push(opcao);
      });

      const questao = Array.from(questaoMap.values())[0]; // Obtenha a primeira (e única) questão
      callback(null, questao);
    }
  });
};

function addOpcao(opcaoData,id_questao) {
  try {
    const { id_opcao, opcao, criterio, cotacao } = opcaoData;

    // Insert opcao into the database
    const opcaoInsertQuery = 'INSERT INTO opcao VALUES (?, ?, ?, ?, ?);';
    const opcaoValues = [id_opcao, opcao, criterio, cotacao, id_questao];

    db.query(opcaoInsertQuery, opcaoValues, (err, result) => {
      if (err) {
        console.error('Error inserting opcao:', err);
      }
    });
  } catch (error) {
    console.error('An error occurred in addOpcao:', error);
  }
}
module.exports.addOpcao_post = addOpcao;

function addQuestao(questaoData, id_prova, nVersao) {
  try {
    const { id_questao, enunciado, cotacao, tipoQuestao, opcoes} = questaoData;

    if (!nVersao) {
      nVersao = questaoData.nVersao;
    }

    // Insert questao into the database
    const questaoInsertQuery = 'INSERT INTO questao VALUES (?, ?, ?, ?, ?,?);';
    const questaoValues = [id_questao, enunciado, cotacao, tipoQuestao, nVersao, id_prova];

    db.query(questaoInsertQuery, questaoValues, (err, result) => {
      if (err) {
        console.error('Error inserting questao:', err);
        return;
      }

      // Insert associated opcoes
      opcoes.forEach(opcaoData => {
        addOpcao(opcaoData, id_questao);
      });
    });
  } catch (error) {
    console.error('An error occurred in addQuestao:', error);
  }
}
module.exports.addQuestao_post = addQuestao;


function addVersao(id_prova,idSala,nVersao, hora) {

  if (!nVersao) {
    nVersao = versaoData.nVersao;
  }

  const versaoInsertQuery = 'INSERT INTO provaComVersao VALUES (?, ?, ?,?);';
  const versaoValues = [id_prova,nVersao, idSala, hora];

  db.query(versaoInsertQuery, versaoValues, (err, result) => {
    if (err) {
      console.error('Error inserting provaComVersao:', err);
      return;
    }
    
  });
}
module.exports.addVersao_post = addVersao;

module.exports.addProva = provaData =>{
  const { id_prova, data, duracao, hora, aleatorio, bloquear, salas } = provaData;

  // Insert prova into the database
  nVersoes = salas.length;
  const provaInsertQuery = 'INSERT INTO prova VALUES (?, ?, ?, ?, ?, ?);';
  const provaValues = [id_prova,data, duracao, nVersoes, aleatorio, bloquear];

  db.query(provaInsertQuery, provaValues, (err, result) => {
    if (err) {
      console.error('Error inserting prova:', err);
      return;
    }


    // Insert associated provasComVersao, questoes, and opcoes
    var i = 1;
    salas.forEach( (sala) => {
      addVersao(id_prova,sala,i++, hora);
    });
  });
  
}