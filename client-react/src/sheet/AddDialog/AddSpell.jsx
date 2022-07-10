import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddSpellDialog(props) {
	const [ spellList, setSpellList ] = useState();
	const [ selectedSpell, setSelectedSpell ] = useState();

	/*
	const addSpellApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/spell';
	const addSpell = useCallback(
		() => {
			const data = {
				CodPer: props.CodPer,
                NomeClasse: props.NomeClasse,
                NomeCapacita: selectedSpell!=null? selectedSpell.value:'',
			};

			axios
				.post(addSpellApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedSpell ]
	);
	*/

	const getSpellListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/spell';
	const getSpellList = useCallback(() => {
		axios
			.get(getSpellListApi)
			.then((response) => {
				console.log(response);
				const spellOption = response.data.body.map((feat) => ({ value: feat.Nome, label: feat.Nome }));
				setSpellList(spellOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			//getSpellList();
		},
		[ getSpellList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Spell</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300 }}>
					<label>Lista Spell</label>
					{spellList != null && <Select value={selectedSpell} onChange={setSelectedSpell} options={spellList} />}
				</div>
				<Button onClick={getSpellList}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddSpellDialog;
