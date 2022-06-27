import styles from './Sheet.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Sheet() {
	let navigate = useNavigate();
	let params = useParams();
	console.log(params.email, params.CodPer);

	const backToHome = useCallback(
		() => {
			navigate('/home/' + params.email);
		},
		[ navigate, params.email ]
	);

	return (
		<div style={styles.sheet} className='home'>
			<Button title='back' onClick={backToHome} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<p>Character Detail page</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} />
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 4, alignItems: 'center' }}>
					<p>Character Detail page</p>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 3, alignItems: 'center' }}>
					<p>Abilities</p>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} />
			</div>
		</div>
	);
}

export default Sheet;
