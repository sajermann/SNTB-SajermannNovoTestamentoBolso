interface Biblia{
	id?: number;
	titulo: string;
	capitulo: number;
	versiculo: number;
	descricao: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export default Biblia;