import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddBonusFeatDialog(props) {
	const [ featsList, setFeatsList ] = useState();
	const [ selectedBonusFeat, setSelectedBonusFeat ] = useState();

	
	const addBonusFeatApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/bonusfeats';
	const addBonusFeat = useCallback(
		() => {
			const data = {
				CodPer: props.CodPer,
                NomeClasse: props.NomeClasse,
                NomeTalento: selectedBonusFeat!=null? selectedBonusFeat.value:'',
			};

			axios
				.post(addBonusFeatApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedBonusFeat ]
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
			if(props.open){
				getFeatList();
			}
		},
		[ getFeatList,props ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi BonusFeat</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 200}}>
					<label>Lista Talenti</label>
					{featsList != null && <Select value={selectedBonusFeat} onChange={setSelectedBonusFeat} options={featsList} />}
				</div>
				<Button onClick={addBonusFeat}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddBonusFeatDialog;
