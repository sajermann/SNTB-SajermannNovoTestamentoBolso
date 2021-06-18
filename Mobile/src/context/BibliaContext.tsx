import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Biblia from '../models/Biblia';
import Info from '../models/Info';
import api from '../services/api';
import BibliaContextRepository from '../services/sqlite/Biblia';
import InfoContextRepository from '../services/sqlite/Info';
import consola from 'consola';
import Console from '../utils/Console';

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

  async function loadInfoMobile(): Promise<Info> {
    //Busca as infos no Celular
    const dataInfoMobile = await InfoContextRepository.all()
    .then( results => results)
    .catch( err => console.log('Erro no Info', err));
    //console.log('Retornando o dataInfoMobile', dataInfoMobile);
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
  async function removeAllBibliasMobile(): Promise<void>{
    await BibliaContextRepository.removeAll()
      .then()
      .catch( err => console.log('Erro no removeAllBibliasMobile', err));
      Console({message: 'Database Mobile removed with success!'}); 
  }
  async function addAllBibliasInMobile(dataBibliaExternal: Biblia[]): Promise<void>{
    dataBibliaExternal.forEach(async (item)=>{
      await BibliaContextRepository.create(item)
      .then()
      .catch( err => console.log('Error in addAllBibliasInMobile', err));
    });
    Console({message: 'Database Mobile updated with success!'}); 
  }
  async function removeInfoMobile(): Promise<void>{
    await InfoContextRepository.removeAll()
    .then( results => results)
    .catch( err => console.log('Error in removeInfoMobile', err));
    Console({message: 'Database Info Mobile removed with success!'});  
  }
  async function addInfoInMobile(dataInfoExternal: Info): Promise<void>{
    await InfoContextRepository.create(dataInfoExternal)
    .then()
    .catch( err => console.log(`Erro no Info addInfoInMobile()`, err));
    Console({message: 'Database Info Mobile updated with success!'});
  }

  useEffect(()=>{
    async function loadBiblias(){
      let dataInfoExternal: Info;
      //Busca as infos no servidor
      try{
        const { data } = await api.get<Info>('/Info');
        dataInfoExternal = {...data}
      }catch(err){
        Console({
          style: 'error',
          message: `Erro na recuperação das Infos no Servidor! Prosseguir com dados locais!`
        });
        // Segue o fluxo Mobile
        await roadMapBibliaMobile();
        return;
      }

      //Busca as infos no Celular
      const dataInfoMobile = await loadInfoMobile();
      // Se os Info Externo e Mobile estiverem atualizados,
      if(dataInfoExternal.updatedAt === dataInfoMobile.updatedAt){
        // Segue o fluxo Mobile
        Console({message: `Mobile já está atualizado! Prosseguir com dados locais!`});
        await roadMapBibliaMobile();
        return;
     }
      
      // Se continuou a função é porque as datas eram diferentes, nesse caso
      // se faz necessário atualizar os dois bancos de dados.
      Console({message: `Mobile está desatualizado! Atualizando informações: `});
      console.log({dataInfoExternal: dataInfoExternal.updatedAt});
      console.log({dataInfoMobile: dataInfoMobile.updatedAt});
      const { data: dataBibliaExternal } = await api.get<Biblia[]>('/PocketNewTestament');
     
      // Remove todos os registros da Biblia no Mobile
      await removeAllBibliasMobile();
      
      //Insere todos os registros do External no Mobile
      await addAllBibliasInMobile(dataBibliaExternal);
 
      // Remove o InfoMobile 
      await removeInfoMobile();

      // Insere o registro do External no Mobile
      await addInfoInMobile(dataInfoExternal);

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