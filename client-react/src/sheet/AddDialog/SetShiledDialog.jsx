import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddShieldDialog(props) {
	const [ shieldList, setShieldList ] = useState();
	const [ selectedShield, setSelectedShield ] = useState();

	const addArmorApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/shield';
	const addArmor = useCallback(
		() => {
			const data = {
				Imbraccia: selectedShield,
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
		[ selectedShield ]
	);

	const getShieldListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/shield';
	const getShieldList = useCallback(() => {
		axios
			.get(getShieldListApi)
			.then((response) => {
				console.log(response);
				const shieldOption = response.data.body.map((shield) => ({ value: shield.Nome, label: shield.Nome }));
				setShieldList(shieldOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getShieldList();
		},
		[ getShieldList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Imposta Scudo</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 200 }}>
					<label>Lista Scudi</label>
					{shieldList != null && <Select value={selectedShield} onChange={setSelectedShield} options={shieldList} />}
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

export default AddShieldDialog;
