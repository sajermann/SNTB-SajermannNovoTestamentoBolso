import Biblia from "../../models/Biblia";
import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE Biblia;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
   // "CREATE TABLE IF NOT EXISTS biblia (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, model TEXT, hp INT);"
   `CREATE TABLE IF NOT EXISTS Biblia (
     id INTEGER PRIMARY KEY, 
     titulo TEXT, 
     capitulo INT, 
     versiculo INT,
     descricao TEXT,
     createdAt TEXT,
     updatedAt TEXT
     );`
  );
});

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj: Biblia) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO biblia (id, titulo, capitulo, versiculo, descricao, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?, ?);",
        [obj.id, obj.titulo, obj.capitulo, obj.versiculo, obj.descricao, obj.createdAt, obj.updatedAt],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error): boolean => {
          reject(error);
          return false
        } // erro interno em tx.executeSql
      );
    });
  });
};


/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM biblia;",
        [],
        //-----------------------
        (_, rows: any): Biblia[] | void => resolve(rows.rows._array),
        (_, error): boolean => {
          reject(error);
          return false
        } // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const removeAll = async (): Promise<Biblia> => {
  return new Promise((_, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM biblia;",
        [],
        //-----------------------
        (_, error): boolean => {
          reject(error);
          return false
        } // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  all,
  removeAll,
};
