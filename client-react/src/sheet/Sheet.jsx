import styles from './Sheet.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Sheet() {
	let navigate = useNavigate();
	let params = useParams();
	console.log(params.CodPer);

	const [ characters, setCharacters ] = useState();

	const getCharactersApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/home';

	const getCharacters = useCallback(
		() => {
			const data = { Email: params.email };

			axios
				.post(getCharactersApi, data)
				.then((response) => {
					console.log(response);
					setCharacters(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ params.email ]
	);

	useEffect(
		() => {
			//getCharacters();
		},
		[ getCharacters ]
	);

	const openOcDetail = useCallback((CodPer) => {
		navigate('/Sheet/' + CodPer);
	});

	const Character = (props) => {
		return (
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
				{props.character.Nome} <Button title='show' onClick={() => openOcDetail(props.character.CodPer)} />
			</div>
		);
	};

	const OCs = () => {
		return (
			<div>
				<h1>Your Current Characters:</h1>
				<ul>{characters.map((character, index) => <Character key={index} character={character} />)}</ul>
			</div>
		);
	};

	return (
		<div style={styles.sheet} className='home'>
			<p>Character Detail page</p>
		</div>
	);
}

export default Sheet;
