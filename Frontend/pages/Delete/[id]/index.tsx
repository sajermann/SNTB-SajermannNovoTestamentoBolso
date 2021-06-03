import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Imports Material UI
import { Button, TextField, Typography } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import { toast } from 'react-toastify';

import Biblia from '../../../Models/Biblia';
import styles from './index.module.css';
import api from '../../../services/service';

export default function Delete() {
	const router = useRouter();
	const { id } = router.query;
	const [biblia, setBiblia] = useState<Biblia>({
		id: 0,
		titulo: '',
		capitulo: 0,
		versiculo: 0,
		descricao: '',
	});
	const [isLoading, setIsLoading] = useState(true);
	async function handleDelete() {
		const result = await api.delete(`/api/PocketNewTestament/${id}`);
		console.log(result);
		if (result.status === 200) {
			toast.success('Registro deletado com sucesso');
			router.push('/Home');
		} else {
			toast.error('Ocorreu um erro');
			console.log(result);
		}
	}

	useEffect(() => {
		console.log('Bateu no delete', id);
		async function getData() {
			const { data } = await api.get<Biblia>(`/api/PocketNewTestament/${id}`);
			setBiblia(data);
			setIsLoading(false);
		}
		if (id) getData();
	}, [id]);

	function handleHome(): void {
		router.push('/Home');
	}

	return (
		<div className={styles.container}>
			<div className={styles.divInput}>
				<Typography variant="h3" component="h4" gutterBottom noWrap>
					Deletar Registro
				</Typography>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputId"
					className=""
					label="Id"
					value={biblia.id}
					name="id"
					disabled
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputTitulo"
					className=""
					label="Título"
					value={biblia.titulo}
					name="titulo"
					disabled
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputCapitulo"
					className=""
					label="Capítulo"
					value={biblia.capitulo}
					name="capitulo"
					type="number"
					disabled
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputVersiculo"
					className=""
					label="Versículo"
					value={biblia.versiculo}
					name="versiculo"
					type="number"
					disabled
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputDescricao"
					className="bruno"
					label="Descrição"
					value={biblia.descricao}
					name="descricao"
					multiline
					disabled
				/>
			</div>
			<div className={styles.divButtons}>
				<Button
					variant="contained"
					color="primary"
					className={styles.buttonConfirm}
					startIcon={<CheckBoxOutlinedIcon />}
					onClick={handleDelete}
				>
					Confirmar
				</Button>
				<Button
					variant="contained"
					color="secondary"
					className="e"
					startIcon={<CancelPresentationIcon />}
					onClick={handleHome}
				>
					Cancelar
				</Button>
			</div>
		</div>
	);
}
