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
	const [ livello, setLivello ] = useState();
    const [ tempra, setTempra ] = useState();
    const [ riflessi, setRiflessi ] = useState();
    const [ volonta, setVolonta ] = useState();
    const [ dadoVita, setDadoVita ] = useState();
    const competenzaArmi = [true,false]
    const competenzaArmiList = competenzaArmi.map((comp) => ({ value: comp, label: comp }));
    const [ CompArmiGuerra, setCompArmiGuerra ] = useState();
    const [ CompArmiEsotiche, setCompArmiEsotiche ] = useState();

compArmature
CompScudi int 

	const addClassApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/feats';
	const addClass = useCallback(
		() => {
			const data = {
				NomeClasse: selectedClass!=null? selectedClass.value:'',
				CodPer: props.CodPer,
                
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

	const getClassListApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/feats';
	const getClassList = useCallback(() => {
		axios
			.get(getClassListApi)
			.then((response) => {
				console.log(response);
				const featsOption = response.data.body.map((feat) => ({ value: feat.Nome, label: feat.Nome }));
				setClassList(featsOption);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}, []);

	useEffect(
		() => {
			getClassList();
		},
		[ getClassList ]
	);

	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>Aggiungi Classe</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column', minHeight: 300 }}>
					<label>Lista Classi</label>
					{classList != null && <Select value={selectedClass} onChange={setSelectedClass} options={classList} />}
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
