import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddArmorDialog(props) {
	const [ armorList, setArmorList ] = useState();
	const [ selectedArmor, setSelectedArmor ] = useState();

	const addArmorApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/armor';
	const addArmor = useCallback(
		() => {
			const data = {
				Veste: selectedArmor!=null? selectedArmor.value:'',
				CodPer: props.CodPer,
			};

			axios
				.post(addArmorApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedArmor ]
	);

	const getArmorListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/armor';
	const getArmorList = useCallback(() => {
		axios
			.get(getArmorListApi)
			.then((response) => {
				console.log(response);
				const armorOption = response.data.body.map((armor) => ({ value: armor.Nome, label: armor.Nome }));
                armorOption.push({value:'nulla', label:'nulla'});
				setArmorList(armorOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getArmorList();
		},
		[ getArmorList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Imposta Armatura</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 200 }}>
					<label>Lista Scudi</label>
					{armorList != null && <Select value={selectedArmor} onChange={setSelectedArmor} options={armorList} />}
				</div>
				<Button onClick={addArmor}>imposta armatura</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddArmorDialog;
