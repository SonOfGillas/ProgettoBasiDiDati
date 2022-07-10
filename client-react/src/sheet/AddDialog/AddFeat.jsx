import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddFeatDialog(props) {
	const [ featsList, setFeatsList ] = useState();
	const [ selectedFeat, setSelectedFeat ] = useState();

	const addFeatApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/feats';
	const addFeat = useCallback(
		() => {
			const data = {
				NomeTalento: selectedFeat!=null? selectedFeat.value:'',
				CodPer: props.CodPer,
			};

			axios
				.post(addFeatApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedFeat ]
	);

	const getFeatListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/feats';
	const getFeatList = useCallback(() => {
		axios
			.get(getFeatListApi)
			.then((response) => {
				console.log(response);
				const featsOption = response.data.body.map((feat) => ({ value: feat.Nome, label: feat.Nome }));
				setFeatsList(featsOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getFeatList();
		},
		[ getFeatList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Talento</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300 }}>
					<label>Lista Talenti</label>
					{featsList != null && <Select value={selectedFeat} onChange={setSelectedFeat} options={featsList} />}
				</div>
				<Button onClick={addFeat}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddFeatDialog;
