import Info from "../../models/Info";
import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
try{
  db.transaction((tx) => {
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE Info;");
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Info (
      id INTEGER PRIMARY KEY, 
      registersCount INT, 
      version TEXT, 
      databaseSize TEXT,
      updatedAt TEXT
      );`
    );
    
  });
}catch(err){
  console.log('deu err no try catch', err)
}

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj: Info): Promise<Info> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO Info (id, registersCount, version, databaseSize, updatedAt) values (?, ?, ?, ?, ?);",
        [obj.id, obj.registersCount, obj.version, obj.databaseSize, obj.updatedAt],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(obj);
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
const all = async (): Promise<Info> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM Info",
        [],
        //-----------------------
        (_, { rows }: any): Info | void => 
        {
          const result: Info = {
            version: '0',
            databaseSize: '0',
            registersCount: 2,
            updatedAt: new Date()
          };
          if(rows._array.length !== 0){
            result.updatedAt = rows._array[0].updatedAt;
          }
          return resolve(result)
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
 * REMOVE TODOS REGISTROS 
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const removeAll = async (): Promise<Info> => {
  return new Promise((_, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM Info",
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
  removeAll
};
