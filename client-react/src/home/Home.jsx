import styles from './Home.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
	let navigate = useNavigate();
	let params = useParams();
	console.log(params.email);

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
			getCharacters();
		},
		[ getCharacters ]
	);

	const openOcDetail = useCallback(
		(CodPer) => {
			navigate('/Sheet/' + params.email + CodPer);
		},
		[ navigate, params.email ]
	);

	const backToLogin = useCallback(
		() => {
			navigate('/');
		},
		[ navigate ]
	);

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
		<div style={styles.home} className='home'>
			<Button title='back' onClick={backToLogin} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>{characters !== undefined && <OCs />}</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button title='New Character' />
			</div>
		</div>
	);
}

export default Home;
