import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddWeaponDialog(props) {
	const [ weaponList, setWeaponList ] = useState();
	const [ selectedWeapon, setSelectedWeapon ] = useState();

	const addWeaponApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/weapon';
	const addWeapon = useCallback(
		() => {
			const data = {
				Nome: selectedWeapon!=null? selectedWeapon.value:'',
				CodPer: props.CodPer,
			};

			axios
				.post(addWeaponApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ selectedWeapon ]
	);

	const getWeaponListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/weapon';
	const getWeaponList = useCallback(() => {
		axios
			.get(getWeaponListApi)
			.then((response) => {
				console.log(response);
				const weaponOption = response.data.body.map((weapon) => ({ value: weapon.Nome, label: weapon.Nome }));
				setWeaponList(weaponOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getWeaponList();
		},
		[ getWeaponList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Arma</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 200 }}>
					<label>Lista Armi</label>
					{weaponList != null && <Select value={selectedWeapon} onChange={setSelectedWeapon} options={weaponList} />}
				</div>
				<Button onClick={addWeapon}>Aggiungi</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddWeaponDialog;
