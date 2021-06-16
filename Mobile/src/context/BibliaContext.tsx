import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Biblia from '../models/Biblia';
import Info from '../models/Info';
import api from '../services/api';
import BibliaContextRepository from '../services/sqlite/Biblia';
import InfoContextRepository from '../services/sqlite/Info';

type bibliaContextType = {
	// user: boolean;
	login: () => void;
	logout: () => void;
  biblias: Biblia[];
};

const bibliaContextDefaultValues: bibliaContextType = {
	// user: null,
	login: () => {},
	logout: () => {},
  biblias: [],
};

export const BibliaContext = createContext<bibliaContextType>(bibliaContextDefaultValues);

export function useBiblia() {
	return useContext(BibliaContext);
}

type Props = {
	children: ReactNode;
};

export function BibliaProvider({ children }: Props) {
	const [user, setUser] = useState<boolean>(false);
  const [biblias, setBiblias] = useState<Biblia[]>()

	const login = () => {
		console.log('Bruno');
		setUser(true);
	};

	const logout = () => {
		setUser(false);
	};

	const value = {
		user,
		login,
		logout,
    biblias
	};

  async function loadInfoExternal(): Promise<Info>{
    const { data } = await api.get<Info>('/Infos');
    return data;
  }

  async function loadInfoMobile(): Promise<any> {
    //Busca as infos no Celular
    const dataInfoMobile = await InfoContextRepository.all()
    .then( results => results)
    .catch( err => console.log('Erro no Info', err));
    return dataInfoMobile;
  }

  async function roadMapBibliaMobile(): Promise<void>{
    // Busca as Biblias Mobile
    const dataBibliaMobile = await BibliaContextRepository.all()
    .then( results => results)
    .catch( err => console.log('Erro no Info', err));

    // Inclue no useState das Biblias e encerra a função loadBiblias
    if(dataBibliaMobile !== undefined){
      setBiblias(dataBibliaMobile);
    }
  }

  useEffect(()=>{
    async function loadBiblias(){
      let dataInfoExternal: Info;
      //Busca as infos no servidor
      try{
        const { data } = await api.get<Info>('/Infos');
        dataInfoExternal = {...data}
      }catch(err){
        console.log({err});
        // Segue o fluxo Mobile
        await roadMapBibliaMobile();
        return;
      }

      //Busca as infos no Celular
      const dataInfoMobile = await loadInfoMobile();
      // Se os Info Externo e Mobile estiverem atualizados,
      if(dataInfoExternal.updatedAt === dataInfoMobile.updatedAt){
        // Segue o fluxo Mobile
        await roadMapBibliaMobile();
        return;
     }
      
      // Se continuou a função é porque as datas eram diferentes, nesse caso
      // se faz necessário atualizar os dois bancos de dados.
      const { data: dataBibliaExternal } = await api.get<Biblia[]>('/PocketNewTestament');
     
      // Remove todos os registros da Biblia
      const removedBibliaMobile = await BibliaContextRepository.removeAll()
      .then( results => console.log('Database Biblia Cleared'))
      .catch( err => console.log('Erro no Info', err));
      
      //Insere todos os registros do External no Mobile
      dataBibliaExternal.forEach(async (item)=>{
        const createdBibliaMobile = await BibliaContextRepository.create(item)
        .then( results => console.log('Database Biblia Cleared'))
        .catch( err => console.log('Erro no Info', err));
      });

      // Remove o InfoMobile 
      const removedInfoMobile = await InfoContextRepository.removeAll()
      .then( results => results)
      .catch( err => console.log('Erro no Info', err));

      // Insere o registro do External no Mobile
      const createdInfoMobile = await InfoContextRepository.create(dataInfoExternal)
      .then( results => results)
      .catch( err => console.log('Erro no Info', err));




      setBiblias(dataBibliaExternal);
    
    };
    loadBiblias();
  },[])

	return (
		<>
			<BibliaContext.Provider value={value}>{children}</BibliaContext.Provider>
		</>
	);
}