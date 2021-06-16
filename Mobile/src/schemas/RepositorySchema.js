export default class RepositorySchema{
  static schema = {
   name: 'Biblia',
   primaryKey: 'id',
   properties:{
     id: {type: 'int', indexed: true},
     titulo: 'string',
     capitulo: 'int',
     versiculo: 'int',
     descricao: 'string',
     createdAt: 'Date',
     updatedAt: 'Date',
   } 
  }
}

