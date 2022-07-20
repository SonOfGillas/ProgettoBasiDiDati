import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback } from 'react';
import axios from 'axios';

function AddLevelDialog(props) {
	const [ selectedLevel, setSelectedLevel ] = useState();

	const addLevelApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/level';
	const addLevel = useCallback(
		() => {
			const data = {
				Livello: selectedLevel != null ? selectedLevel : 1,
				CodPer: props.CodPer,
				NomeClasse: props.NomeClasse
			};

			axios
				.post(addLevelApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props, selectedLevel ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Imposta Livello</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 200 }}>
					<label>Livello</label>
					<input type='text' value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} />
				</div>
				<Button onClick={addLevel}>imposta livello</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddLevelDialog;
