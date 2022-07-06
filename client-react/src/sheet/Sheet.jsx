import styles from './Sheet.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import ClassListElement from './ClassListElement';
import EquipDialog from './EquipDialog';
import RaceDialog from './RaceDialog';
import FeatsDialog from './FeatDIalog';

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
	const [ openFeats, setOpenFeats ] = useState();
	const [ openRace, setOpenRace ] = useState();
	const [ openEquip, setOpenEquip ] = useState(false);

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

	const OpenEquipDialog = useCallback(()=>setOpenEquip(true),[]);
	const CloseEquipDialog = useCallback(()=>setOpenEquip(false),[]);
	const OpenRaceDialog = useCallback(()=>setOpenRace(true),[]);
	const CloseRaceDialog = useCallback(()=>setOpenRace(false),[]);
	const OpenFeatsDialog = useCallback(()=>setOpenFeats(true),[]);
	const CloseFeatsDialog = useCallback(()=>setOpenFeats(false),[]);


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
						<h4>Caratteristiche</h4>
						<p>Forza:{oc.Forza} Destrezza:{oc.Destrezza} Costituzione:{oc.Costituzione}</p>
						<p>Intelligenza:{oc.Intelligenza} Saggezza:{oc.Saggezza} Carisma:{oc.Carisma}</p>
						<h4>Tiri salvezza</h4>
						<p>Tempra:{oc.Tempra} Riflessi:{oc.Riflessi} Volonta:{oc.Volonta}</p><h5>Equippagiamento</h5>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							Imbraccia: {oc.Imbraccia??'nulla'} 
							{oc.Imbraccia!=null && <Button title='show' onClick={OpenEquipDialog}/>}
						</div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							Veste: {oc.Veste??'nulla'}
							{oc.Veste!=null && <Button title='show' onClick={OpenEquipDialog} />}
						</div>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Armi {oc.Armi} <Button title='show' onClick={OpenEquipDialog} /></div>
					</div>}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 3, alignItems: 'center' }}>
					<h4>Classi</h4>
					{classes && classes.map((item,index)=><ClassListElement key={index} classe={item} CodPer={params.CodPer} />)}
					
					
					{ oc && <div>
						<h5>Razza</h5>
						<div style={{ display: 'flex', flexDirection: 'row' }}>Razza: {oc.Razza} <Button title='show' onClick={OpenRaceDialog} /></div>
						<h5>Talenti</h5>
						<Button title='show' onClick={OpenFeatsDialog}/>
						</div>}
					
				</div>	
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} />
			</div>
			{oc && <RaceDialog open={openRace} handleClose={CloseRaceDialog}  Razza={oc.Razza}/>}
			{oc && <EquipDialog open={openEquip} handleClose={CloseEquipDialog} Veste={oc.Veste} Imbraccia={oc.Imbraccia} CodPer={params.CodPer}/> }
			{oc && <FeatsDialog open={openFeats} handleClose={CloseFeatsDialog} CodPer={oc.CodPer}/>}
		</div>
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

export default Sheet;
