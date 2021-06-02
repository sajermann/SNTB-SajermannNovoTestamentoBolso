import React, { useEffect, useState } from 'react';

// Imports do Material UI
import { Paper, Grid, Typography, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import HistoryIcon from '@material-ui/icons/History';

import formatDateTime from '../../utils/formatDateTime';
import Biblia from '../../Models/Biblia';
import api from '../../services/service';
import styles from './index.module.css';

export default function Home() {
	const [biblias, setBiblias] = useState<Biblia[]>();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function getData() {
			const { data } = await api.get<Biblia[]>('/api/PocketNewTestament');
			setBiblias(data);
			setIsLoading(false);
		}
		getData();
	});

	if (isLoading) return <div>Carregando</div>;
	return (
		<div className={styles.container}>
			<TextField
				id="outlined-search"
				label="Pesquisar"
				type="search"
				variant="outlined"
			/>
			<Grid container spacing={1}>
				{!isLoading &&
					biblias.map((biblia, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12}>
							<Paper elevation={3} className={styles.block}>
								<Grid container spacing={1}>
									<Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
										{/* <div className={styles.boxLeft}> */}
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
									{/* </div> */}
									{/* <div className={styles.boxRight}> */}
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
												aria-label="delete"
												className="{classes.margin}"
											>
												<EditIcon fontSize="large" />
											</IconButton>
											<IconButton
												aria-label="delete"
												className="{classes.margin}"
											>
												<DeleteIcon fontSize="large" />
											</IconButton>
										</div>
									</Grid>
									{/* </div> */}
								</Grid>
							</Paper>
						</Grid>
					))}
			</Grid>
			<Pagination count={10} showFirstButton showLastButton />
		</div>
	);
}
