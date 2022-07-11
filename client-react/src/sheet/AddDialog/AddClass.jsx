import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddClassDialog(props) {
    const classesName = ['mago','magus','guerriero']
    const classList = classesName.map((classe) => ({ value: classe, label: classe }));
	const [ selectedClass, setSelectedClass ] = useState();
	const [ livello, setLivello ] = useState(1);

	const addClassApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class';
	const addClass = useCallback(
		() => {
			const data = {
				NomeClasse: selectedClass!=null? selectedClass.value:'',
				CodPer: props.CodPer,
                Livello: livello,
			};

			axios
				.post(addClassApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedClass ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Classe</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300 }}>
					<label>Tipo Classe</label>
					<Select value={selectedClass} onChange={setSelectedClass} options={classList} />
					<label>Livello</label>
					<input type='text' value={livello} onChange={(e) => setLivello(e.target.value)} />
				</div>
				<Button onClick={addClass}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}


export default AddClassDialog;
