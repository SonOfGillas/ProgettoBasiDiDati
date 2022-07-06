import Button from '../components/Button';
import ClassDialog from './ClassDialog';
import { useState,useCallback } from 'react';
import BonusFeatsDialog from './FeatDIalog';

function ClassListElement(props) {
	const classe = props.classe;
	const CodPer = props.CodPer;

	const [classDetailDialog, setOpenClassDetail] = useState(false);
	const [bonusFeatsDialog, setOpenBonusFeatsDialog] = useState(false);

	const openClassDetailDialog = useCallback(()=>setOpenClassDetail(true));
	const closeClassDetailDialog = useCallback(()=>setOpenClassDetail(false));
	const openBonusFeatsDialog = useCallback(()=>setOpenBonusFeatsDialog(true));
	const closeBonusFeatsDialog = useCallback(()=>setOpenBonusFeatsDialog(false));

	return (
			<div style={{ display: 'flex',flexDirection:'column', border:5, borderStyle:'solid',padding:30, marginBottom:10 }}>
				<div style={{display:'flex', flexDirection:'row'}}><h4>{classe.NomeClasse} livello {classe.Livello}</h4><Button title='show' onClick={openClassDetailDialog} /></div>	
				<div style={{display:'flex', flexDirection:'row'}}>capacita di classe <Button title='show' onClick={()=>{}} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>incantesimi <Button title='show' onClick={()=>{}} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>talenti bonus <Button title='show' onClick={openBonusFeatsDialog} /></div>
				<ClassDialog classe={classe} open={classDetailDialog} handleClose={closeClassDetailDialog}/>
				<BonusFeatsDialog open={bonusFeatsDialog} handleClose={closeBonusFeatsDialog} CodPer={CodPer} NomeClasse={classe}/>
			</div>
	);
}

export default ClassListElement;