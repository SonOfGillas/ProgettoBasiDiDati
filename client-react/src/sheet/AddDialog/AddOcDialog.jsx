import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddOcDialog(props) {
	const [ raceList, setRaceList ] = useState();
	const [ selectedrace, setSelectedRace ] = useState();
	const [ nome, setNome ] = useState();
	const [ allineamento, setAllineamento ] = useState();
	const [ forza, setForza ] = useState(10);
	const [ destrezza, setDestrezza ] = useState(10);
	const [ costituzione, setCostituzione ] = useState(10);
	const [ intelligenza, setIntelligenza ] = useState(10);
	const [ saggezza, setSaggezza ] = useState(10);
	const [ carisma, setCarisma ] = useState(10);

	const addOcApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet';
	const addOc = useCallback(
		() => {
			const data = {
				Nome: nome,
				EmailUser: props.email,
				Razza: selectedrace != null ? selectedrace.value : 'umano',
				Allineamento: allineamento,
				Forza: forza,
				Destrezza: destrezza,
				Costituzione: costituzione,
				Intelligenza: intelligenza,
				Saggezza: saggezza,
				Carisma: carisma
			};

			axios
				.post(addOcApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ allineamento, carisma, costituzione, destrezza, forza, intelligenza, nome, props, saggezza, selectedrace ]
	);

	const getRaceListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/race';
	const getRaceList = useCallback(() => {
		axios
			.get(getRaceListApi)
			.then((response) => {
				console.log(response);
				const raceOption = response.data.body.map((race) => ({ value: race.Nome, label: race.Nome }));
				setRaceList(raceOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			if(props.open){
				getRaceList();
			}
		},
		[ getRaceList, props ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiunge un personaggio</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<label>Nome</label>
					<input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
					{raceList != null && <Select value={selectedrace} onChange={setSelectedRace} options={raceList} />}
					<label>Allineamento</label>
					<input type='text' value={allineamento} onChange={(e) => setAllineamento(e.target.value)} />
					<label>Forza</label>
					<input type='text' value={forza} onChange={(e) => setForza(e.target.value)} />
					<label>Destrezza</label>
					<input type='text' value={destrezza} onChange={(e) => setDestrezza(e.target.value)} />
					<label>Costituzione</label>
					<input type='text' value={costituzione} onChange={(e) => setCostituzione(e.target.value)} />
					<label>Intelligenza</label>
					<input type='text' value={intelligenza} onChange={(e) => setIntelligenza(e.target.value)} />
					<label>Saggezza</label>
					<input type='text' value={saggezza} onChange={(e) => setSaggezza(e.target.value)} />
					<label>Carisma</label>
					<input type='text' value={carisma} onChange={(e) => setCarisma(e.target.value)} />
				</div>
				<Button onClick={addOc}>Crea Personaggio</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddOcDialog;
