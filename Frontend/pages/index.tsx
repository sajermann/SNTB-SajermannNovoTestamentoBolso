import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

import styles from './index.module.css';

export default function Login() {
	const router = useRouter();
	function handleHome(): void {
		router.push('/Add');
	}
	return (
		<div className={styles.container}>
			<Button
				variant="contained"
				color="primary"
				className="e"
				startIcon={<AssignmentIcon />}
				onClick={handleHome}
			>
				Acessar Sistema
			</Button>
		</div>
	);
}
