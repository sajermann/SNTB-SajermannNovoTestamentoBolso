import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

// Imports do Material UI
import { Paper, Grid, Typography, TextField, Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import HistoryIcon from '@material-ui/icons/History';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Skeleton from '@material-ui/lab/Skeleton';
import Tooltip from '@material-ui/core/Tooltip';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import formatDateTime from '../../utils/formatDateTime';
import formatSize from '../../utils/formatSize';
import Biblia from '../../Models/Biblia';
import Info from '../../Models/Info';
import api from '../../services/service';
import styles from './index.module.css';

export default function Home() {
	const router = useRouter();
	const [biblias, setBiblias] = useState<Biblia[]>();
	const [info, setInfo] = useState<Info>();
	const [bibliasShow, setBibliasShow] = useState<Biblia[]>();
	const [bibliasFiltred, setBibliasFiltred] = useState<Biblia[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [itensPerPag, setItensPerPag] = useState(2);
	const [currentPage, setCurrentPage] = useState(1);

	function handleShowBiblia(bibliasParams: Biblia[]) {
		const t = [];
		for (let i = 0; i < itensPerPag; i += 1) {
			if (bibliasParams.length === i) break;
			t.push(bibliasParams[i]);
		}
		// console.log('Biblias que serão mostradas', t);
		setBibliasShow(t);
	}

	function handlePagination(page: number) {
		const fim = page * itensPerPag;
		const inicio = fim - itensPerPag;
		const t = [];
		for (let i = inicio; i < fim; i += 1) {
			if (bibliasFiltred.length === i) break;
			t.push(bibliasFiltred[i]);
		}
		setBibliasShow(t);
	}

	useEffect(() => {
		async function getData() {
			const { data } = await api.get<Biblia[]>('/api/PocketNewTestament');
			setBiblias(data);
			setBibliasFiltred(data);
			handleShowBiblia(data);
			const { data: dataInfo } = await api.get<Info>('/api/Info');
			setInfo(dataInfo);
			setIsLoading(false);
		}
		getData();
	}, []);

	function handleFilterBiblia(e: ChangeEvent<HTMLInputElement>) {
		const valueSearch = e.target.value.toLowerCase();
		const firstLetter = valueSearch.split('')[0];
		const capitulo = valueSearch.split(':')[0].split('@')[1] || '';
		const versiculo = valueSearch.split(':')[1] || '';
		const bibliasForFilter = [...biblias];
		const resultFiltred = bibliasForFilter.filter(item => {
			if (firstLetter === '@') {
				return (
					item.capitulo.toString() === capitulo &&
					item.versiculo.toString() === versiculo
				);
			}
			return (
				item.titulo.toLowerCase().indexOf(valueSearch) > -1 ||
				item.descricao.toLowerCase().indexOf(valueSearch) > -1 ||
				item.capitulo.toString().indexOf(valueSearch) > -1 ||
				item.versiculo.toString().indexOf(valueSearch) > -1
			);
		});
		if (resultFiltred) {
			setBibliasFiltred(resultFiltred);
			handleShowBiblia(resultFiltred);
		}
		setCurrentPage(1);
	}

	if (isLoading) {
		return (
			<div className={styles.container}>
				<Grid container spacing={1} justify="center" alignItems="center">
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<Paper elevation={3} className={styles.block}>
							<Skeleton width="100%" />
						</Paper>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
						<div className={styles.inputSearch}>
							<Skeleton width={350} height={80} />
						</div>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
						<Box display="flex" justifyContent="flex-end" alignItems="flex-end">
							<Skeleton width={150} height={70} />
						</Box>
					</Grid>
					{['1', '2'].map(biblia => (
						// eslint-disable-next-line react/no-array-index-key
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<Paper elevation={3} className={styles.block}>
								<Skeleton width="100%" height={200} />
							</Paper>
						</Grid>
					))}

					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={12}
						xl={12}
						className={styles.pagination}
					>
						<Skeleton width="60%" height={50} />
					</Grid>
				</Grid>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Grid container spacing={1} justify="center" alignItems="center">
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Paper elevation={3} className={styles.block}>
						Registros: {info.registersCount} | Versão: {info.version} | Tamanho
						Database: {formatSize(info.databaseSize, 'KB')} | Última
						Atualização: {formatDateTime(info.updatedAt)}
					</Paper>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<div className={styles.inputSearch}>
						<TextField
							id="outlined-search"
							label="Pesquisar"
							type="search"
							variant="outlined"
							onChange={handleFilterBiblia}
						/>
						<Tooltip
							title="Dica: Pesquise por Cap/Ver utilizando o @. Ex: @1:15"
							placement="right"
						>
							<ContactSupportIcon fontSize="large" />
						</Tooltip>
					</div>
				</Grid>
				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Box display="flex" justifyContent="flex-end" alignItems="flex-end">
						<Button
							variant="contained"
							color="primary"
							className={styles.buttonConfirm}
							startIcon={<AddBoxIcon />}
							size="large"
							onClick={() => router.push(`/Add`)}
						>
							Adicionar
						</Button>
					</Box>
				</Grid>
				{!isLoading &&
					bibliasFiltred &&
					bibliasShow.map(biblia => (
						// eslint-disable-next-line react/no-array-index-key
						<Grid key={biblia.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
							<Paper elevation={3} className={styles.block}>
								<Grid container spacing={1}>
									<Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
										<div className={styles.title}>
											<Typography
												variant="h3"
												component="h4"
												gutterBottom
												noWrap
											>
												{biblia.titulo}
											</Typography>
										</div>
										<div className={styles.capVer}>
											<Typography
												variant="h5"
												component="h6"
												gutterBottom
												noWrap
											>
												{biblia.capitulo} : {biblia.versiculo}
											</Typography>
										</div>
										<div className={styles.createUpdated}>
											<AlarmOnIcon className={styles.icon} />
											{formatDateTime(biblia.createdAt)}
										</div>
										<div className={styles.createUpdated}>
											<HistoryIcon className={styles.icon} />
											{formatDateTime(biblia.updatedAt)}
										</div>
									</Grid>
									<Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
										<div className={styles.boxDescription}>
											<Typography variant="h5" component="h6" gutterBottom>
												{biblia.descricao}
											</Typography>
										</div>
									</Grid>
									<Grid item xs={10} sm={10} md={2} lg={2} xl={2}>
										<div className={styles.buttons}>
											<IconButton
												onClick={() => router.push(`/Edit/${biblia.id}`)}
												aria-label="edit"
												className="{classes.margin}"
											>
												<EditIcon fontSize="large" />
											</IconButton>
											<IconButton
												onClick={() => router.push(`/Delete/${biblia.id}`)}
												aria-label="delete"
												className="{classes.margin}"
											>
												<DeleteIcon fontSize="large" />
											</IconButton>
										</div>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					))}
				{bibliasFiltred.length > 0 && (
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={12}
						xl={12}
						className={styles.pagination}
					>
						<Pagination
							count={Math.ceil(bibliasFiltred.length / itensPerPag)}
							showFirstButton
							showLastButton
							page={currentPage}
							onChange={(event, page) => {
								// eslint-disable-next-line no-alert
								setCurrentPage(page);
								handlePagination(page);
							}}
						/>
					</Grid>
				)}

				{bibliasFiltred.length === 0 && (
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<Paper elevation={3} className={styles.block}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<div className={styles.title}>
										<Typography variant="h3" component="h4" gutterBottom noWrap>
											Sem resultados!
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				)}
			</Grid>
		</div>
	);
}
