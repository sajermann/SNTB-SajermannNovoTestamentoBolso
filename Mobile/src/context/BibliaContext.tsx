import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Biblia from '../models/Biblia';
import api from '../services/api';
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

  useEffect(()=>{
    async function loadBiblias(){
      
      const { data } = await api.get<Biblia[]>('/PocketNewTestament');
      setBiblias(data);
      
    };
    loadBiblias();
  },[])

	return (
		<>
			<BibliaContext.Provider value={value}>{children}</BibliaContext.Provider>
		</>
	);
}