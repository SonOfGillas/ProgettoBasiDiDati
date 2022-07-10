import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddCapacityDialog(props) {
	const [ capacityList, setCapacityList ] = useState();
	const [ selectedCapacity, setSelectedCapacity ] = useState();

	const addCapacityApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/capacity';
	const addCapacity = useCallback(
		() => {
			const data = {
				CodPer: props.CodPer,
                NomeClasse: props.NomeClasse,
                NomeCapacita: selectedCapacity!=null? selectedCapacity.value:'',
			};

			axios
				.post(addCapacityApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedCapacity ]
	);

	const getCapacityListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class/capacity';
	const getCapacityList = useCallback(() => {
		axios
			.get(getCapacityListApi)
			.then((response) => {
				console.log(response);
				const capacityOption = response.data.body.map((feat) => ({ value: feat.Nome, label: feat.Nome }));
				setCapacityList(capacityOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getCapacityList();
		},
		[ getCapacityList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Capacità</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300 }}>
					<label>Lista Capacità</label>
					{capacityList != null && <Select value={selectedCapacity} onChange={setSelectedCapacity} options={capacityList} />}
				</div>
				<Button onClick={addCapacity}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddCapacityDialog;
