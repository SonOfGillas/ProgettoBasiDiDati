import styles from './Home.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import AddOcDialog from '../sheet/AddDialog/AddOcDialog';

function Home() {
	let navigate = useNavigate();
	let params = useParams();
	console.log(params.email);

	const [ characters, setCharacters ] = useState();
	const [ addCharacter, setAddCharacter ] = useState();

	const openCharacterDialog = useCallback(() => setAddCharacter(true), []);

	const closeCharacterDialog = useCallback(() => setAddCharacter(false), []);

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

	const deleteCharacterApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/deletefromsheet'
	const deleteCharacter = useCallback(
		(CodPer) => {
			const data = { CodPer: CodPer };

			axios
				.post(deleteCharacterApi, data)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[]
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
				{props.character.Nome} 
				<div  style={{ display: 'flex', flexDirection: 'row'}}>
				<Button title='show' onClick={() => openOcDetail(props.character.CodPer)} />
				<Button title='delete' onClick={() => deleteCharacter(props.character.CodPer)} />
				</div>
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
				<Button title='New Character' onClick={openCharacterDialog} />
			</div>
			<AddOcDialog open={addCharacter} handleClose={closeCharacterDialog} email={params.email} />
		</div>
	);
}

export default Home;
