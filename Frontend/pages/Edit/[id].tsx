import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Imports Material UI
import { Button, TextField, Typography } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Skeleton from '@material-ui/lab/Skeleton';

import { toast } from 'react-toastify';

import Biblia from '../../Models/Biblia';
import styles from './index.module.css';
import api from '../../services/service';

export default function Edit() {
	const router = useRouter();
	const { id } = router.query;
	const [biblia, setBiblia] = useState<Biblia>({
		id: 0,
		titulo: '',
		capitulo: 0,
		versiculo: 0,
		descricao: '',
	});
	const [canSave, setCanSave] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

	async function handleEdit() {
		const result = await api.put('/api/PocketNewTestament', biblia);
		console.log(result);
		if (result.status === 200) {
			toast.success('Registro editado com sucesso');
			router.push('/Home');
		} else {
			toast.error('Ocorreu um erro');
			console.log(result);
		}
	}

	useEffect(() => {
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

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.divInput}>
					<Skeleton width={350} height={70} />
				</div>
				<div className={styles.divInput}>
					<Skeleton width="100%" height={70} />
				</div>
				<div className={styles.divInput}>
					<Skeleton width="100%" height={70} />
				</div>
				<div className={styles.divInput}>
					<Skeleton width="100%" height={70} />
				</div>
				<div className={styles.divInput}>
					<Skeleton width="100%" height={70} />
				</div>
				<div className={styles.divInput}>
					<Skeleton width="100%" height={70} />
				</div>
				<div className={styles.divButtons}>
					<Skeleton width={150} height={70} />
					<Skeleton width={150} height={70} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.divInput}>
				<Typography variant="h3" component="h4" gutterBottom noWrap>
					Editar Registro
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
					onClick={handleEdit}
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
