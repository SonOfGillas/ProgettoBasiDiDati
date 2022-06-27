import styles from './Home.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
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

	const Character = (props) => {
		return (
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
				{props.character.Nome} <Button title='show' />
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
			<div style={styles.home_containiner}>{characters !== undefined && <OCs />}</div>
			<Button title='New Character' />
		</div>
	);
}

export default Home;
