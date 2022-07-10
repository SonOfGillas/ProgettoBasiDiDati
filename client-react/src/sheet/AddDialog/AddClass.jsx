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
	const [ bab, setBAB ] = useState(0);
    const [ tempra, setTempra ] = useState(0);
    const [ riflessi, setRiflessi ] = useState(0);
    const [ volonta, setVolonta ] = useState(0);
	const lifeDice = [4,6,8,10,12];
    const lifeDiceList = lifeDice.map((dice) => ({ value: dice, label: dice }));
    const [ dadoVita, setDadoVita ] = useState();
    const competenzaArmi = [true,false]
    const competenzaArmiList = competenzaArmi.map((comp) => ({ value: comp, label: comp?'si':'no' }));
    const [ compArmiGuerra, setCompArmiGuerra ] = useState();
    const [ compArmiEsotiche, setCompArmiEsotiche ] = useState();
	const armorProfLevels = [0,1,2,3];
    const armorProfLevelsList = armorProfLevels.map((armorProfLevel) => ({ value: armorProfLevel, label: traslateCompArmature(armorProfLevel)}));
	const [ compArmature, setCompArmature ] = useState();
	const shieldProfLevels = [0,1,2];
    const shieldProfLevelsList = shieldProfLevels.map((shieldProfLevel) => ({ value: shieldProfLevel, label: traslateCompScudi(shieldProfLevel)}));
	const [ compScudi, setCompScudi ] = useState();

	const addClassApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/addtosheet/class';
	const addClass = useCallback(
		() => {
			const data = {
				NomeClasse: selectedClass!=null? selectedClass.value:'',
				CodPer: props.CodPer,
                Livello: livello,
				BAB: bab,
				Tempra: tempra,
				Riflessi: riflessi,
				Volonta: volonta,
				DadoVita: dadoVita!=null? dadoVita.value:'',
				CompArmature: compArmature!=null? compArmature.value:'',
                CompScudi: compScudi!=null? compScudi.value:'',
                CompArmiGuerra:compArmiGuerra!=null? compArmiGuerra.value:'',
                CompArmiEsotiche:compArmiEsotiche!=null? compArmiEsotiche.value:''
			};

			console.log(data)

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
					<label>BAB</label>
					<input type='text' value={bab} onChange={(e) => setBAB(e.target.value)} />
					<label>Tempra</label>
					<input type='text' value={tempra} onChange={(e) => setTempra(e.target.value)} />
					<label>Riflessi</label>
					<input type='text' value={riflessi} onChange={(e) => setRiflessi(e.target.value)} />
					<label>Volonta</label>
					<input type='text' value={volonta} onChange={(e) => setVolonta(e.target.value)} />
					<label>Dado vita</label>
					<Select value={dadoVita} onChange={setDadoVita} options={lifeDiceList} />
					<label>Competenza Armi da Guerra</label>
					<Select value={compArmiGuerra} onChange={setCompArmiGuerra} options={competenzaArmiList} />
					<label>Competenza Armi Esotiche</label>
					<Select value={compArmiEsotiche} onChange={setCompArmiEsotiche} options={competenzaArmiList} />
					<label>Competenza Armature</label>
					<Select value={compArmature} onChange={setCompArmature} options={armorProfLevelsList} />
					<label>Competenza Scudi</label>
					<Select value={compScudi} onChange={setCompScudi} options={shieldProfLevelsList} />
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

export const traslateCompArmature = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'leggere'
		case 2: return 'medie'
		case 3: return 'pesanti'
	}
}

export const traslateCompScudi = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'piccoli'
		case 2: return 'grandi'
	}
}


export default AddClassDialog;
