import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

// Imports Material UI
import { Button, TextField, Typography } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import { toast } from 'react-toastify';

import Biblia from '../../Models/Biblia';
import styles from './index.module.css';
import api from '../../services/service';

export default function Home() {
	const router = useRouter();
	const [biblia, setBiblia] = useState<Biblia>({
		titulo: '',
		capitulo: 0,
		versiculo: 0,
		descricao: '',
	});
	const [canSave, setCanSave] = useState(false);

	function verifyCanSave(bibliaNow): void {
		if (
			bibliaNow.titulo === '' ||
			bibliaNow.capitulo === 0 ||
			bibliaNow.versiculo === 0 ||
			bibliaNow.descricao === ''
		) {
			setCanSave(false);
			return;
		}
		setCanSave(true);
	}

	function handleInput(event: ChangeEvent<HTMLInputElement>) {
		const bibliaNew = { ...biblia };

		switch (event.target.name) {
			case 'titulo':
				bibliaNew.titulo = event.target.value;
				break;
			case 'capitulo':
				bibliaNew.capitulo = parseInt(event.target.value, 10) || 0;
				break;
			case 'versiculo':
				bibliaNew.versiculo = parseInt(event.target.value, 10) || 0;
				break;
			case 'descricao':
				bibliaNew.descricao = event.target.value;
				break;
			default:
				break;
		}

		setBiblia(bibliaNew);
		verifyCanSave(bibliaNew);
	}

	async function handleAdd() {
		const result = await api.post('/api/PocketNewTestament', biblia);
		console.log(result);
		if (result.status === 200) {
			toast.success('Registro incluso com sucesso');
			// router.push('/Home');
			const bibliaActual = { ...biblia };
			bibliaActual.versiculo += 1;
			bibliaActual.descricao = '';
			setBiblia(bibliaActual);
		} else {
			toast.error('Ocorreu um erro');
			console.log(result);
		}
	}

	function handleHome(): void {
		router.push('/Home');
	}

	return (
		<div className={styles.container}>
			<div className={styles.divInput}>
				<Typography variant="h3" component="h4" gutterBottom noWrap>
					Adicionar Registro
				</Typography>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputTitulo"
					className=""
					label="Título"
					value={biblia.titulo}
					onChange={handleInput}
					name="titulo"
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputCapitulo"
					className=""
					label="Capítulo"
					value={biblia.capitulo}
					onChange={handleInput}
					name="capitulo"
					type="number"
					InputProps={{ inputProps: { min: 0 } }}
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputVersiculo"
					className=""
					label="Versículo"
					value={biblia.versiculo}
					onChange={handleInput}
					name="versiculo"
					type="number"
					InputProps={{ inputProps: { min: 0 } }}
				/>
			</div>
			<div className={styles.divInput}>
				<TextField
					fullWidth
					id="inputDescricao"
					className="bruno"
					label="Descrição"
					value={biblia.descricao}
					onChange={handleInput}
					name="descricao"
					multiline
				/>
			</div>
			<div className={styles.divButtons}>
				<Button
					variant="contained"
					color="primary"
					className={styles.buttonConfirm}
					startIcon={<CheckBoxOutlinedIcon />}
					onClick={handleAdd}
					disabled={!canSave}
				>
					Salvar
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
