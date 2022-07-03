import styles from './Sheet.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import ClassListElement from './ClassListElement';

function Sheet() {
	let navigate = useNavigate();
	let params = useParams();
	console.log(params.email, params.CodPer);

	const backToHome = useCallback(
		() => {
			navigate('/home/' + params.email);
		},
		[ navigate, params.email ]
	);

	const [ oc, setOc ] = useState();
	const [ classes, setClasses ] = useState();
	const [ feats, setFeats ] = useState();
	const [ race, setRaces ] = useState();
	const [ equip, setEquip ] = useState();

	const getOCApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet';
	const getOC = useCallback(
		() => {
			const data = { CodPer: params.CodPer  };

			axios
				.post(getOCApi, data)
				.then((response) => {
					console.log(response);
					setOc(response.data.body[0]);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ params.email ]
	);

	const getClassesApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class';
	const getClasses = useCallback(
		() => {
			const data = { CodPer: params.CodPer  };

			axios
				.post(getClassesApi, data)
				.then((response) => {
					console.log(response);
					setClasses(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ params.email ]
	);

	useEffect(()=>{
		getOC();
		getClasses();
	},[])

	return (
		<div style={styles.sheet} className='home'>
			<Button title='back' onClick={backToHome} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<h2>Character Detail page</h2>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} />
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 3, alignItems: 'center' }}>
					<h4>Overview</h4>
					{ oc && 
					<div>
						<p>Nome: {oc.Nome}  Alinnemento:{oc.Allineamento}</p>
						<p>CA:{oc.CA} HP:{oc.HP} BAB:{oc.BAB} BMC:{oc.BMC} DMC:{oc.DMC}</p>
						<h5>Competenze</h5>
						<p>Armature:{traslateCompArmature(oc.CompArmature)} Scudi:{traslateCompScudi(oc.CompScudi)}</p>
						<p>ArmiDaGuerra:{oc.CompeArmiGuerra?'si':'no'} ArmiEsotiche:{oc.CompeArmiEsotiche?'si':'no'}</p>
						<h5>Razza</h5>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Razza: {oc.Razza} <Button title='show' onClick={backToHome} /></div>
						<h5>Equippagiamento</h5>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Imbraccia: {oc.Imbraccia} <Button title='show' onClick={backToHome} /></div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Veste: {oc.Veste} <Button title='show' onClick={backToHome} /></div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Armi {oc.Armi} <Button title='show' onClick={backToHome} /></div>
					</div>}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 3, alignItems: 'center' }}>
					<h4>Classi</h4>
					{classes && classes.map((item,index)=><ClassListElement key={index} classe={item} />)}
					{ oc && <di>
						<h4>Caratteristiche</h4>
					<p>Forza:{oc.Forza} Destrezza:{oc.Destrezza} Costituzione:{oc.Costituzione}</p>
					<p>Intelligenza:{oc.Intelligenza} Saggezza:{oc.Saggezza} Carisma:{oc.Carisma}</p>
					<h4>Tiri salvezza</h4>
					<p>Tempra:{oc.Tempra} Riflessi:{oc.Riflessi} Volonta:{oc.Volonta}</p>
						</di>}
					
				</div>	
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} />
			</div>
		</div>
	);
}

const traslateCompArmature = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'leggere'
		case 2: return 'medie'
		case 3: return 'pesanti'
	}
}

const traslateCompScudi = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'piccoli'
		case 2: return 'grandi'
	}
}

export default Sheet;
