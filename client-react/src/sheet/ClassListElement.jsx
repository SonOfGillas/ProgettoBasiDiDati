import Button from '../components/Button';
import ClassDialog from './ViewDialog/ClassDialog';
import { useState,useCallback } from 'react';
import BonusFeatsDialog from './ViewDialog/BonusFeatDialog';
import SpellDialog from './ViewDialog//SpellDialog'
import CapacityDialog from './ViewDialog/CapacityDialog';
import AddCapacityDialog from './AddDialog/AddCapacity';
import AddSpellDialog from './AddDialog/AddSpell';

function ClassListElement(props) {
	const classe = props.classe;
	const CodPer = props.CodPer;

	const [classDetailDialog, setClassDetailDialog] = useState(false);
	const [bonusFeatsDialog, setBonusFeatsDialog] = useState(false);
	const [speelDialog, setSpeelDialog] = useState(false);
	const [capacityDialog, setCapacityDialog] = useState(false);
	const [addCapacityDialog, setAddCapacityDialog] = useState(false);
	const [addSpellDialog, setAddSpellDialog] = useState(false);

	const openClassDetailDialog = useCallback(()=>setClassDetailDialog(true));
	const closeClassDetailDialog = useCallback(()=>setClassDetailDialog(false));
	const openBonusFeatsDialog = useCallback(()=>setBonusFeatsDialog(true));
	const closeBonusFeatsDialog = useCallback(()=>setBonusFeatsDialog(false));
	const openSpeelDialog = useCallback(()=>setSpeelDialog(true));
	const closeSpeelDialog = useCallback(()=>setSpeelDialog(false));
	const openCapacityDialog = useCallback(()=>setCapacityDialog(true));
	const closeCapacityDialog = useCallback(()=>setCapacityDialog(false));
	const openAddCapacityDialog = useCallback(()=>setAddCapacityDialog(true));
	const closeAddCapacityDialog = useCallback(()=>setAddCapacityDialog(false));
	const openAddSpellDialog = useCallback(()=>setAddSpellDialog(true));
	const closeAddSpellDialog = useCallback(()=>setAddSpellDialog(false));

	return (
			<div style={{ display: 'flex',flexDirection:'column', border:5, borderStyle:'solid',padding:30, marginBottom:10 }}>
				<div style={{display:'flex', flexDirection:'row'}}><h4>{classe.NomeClasse} livello {classe.Livello}</h4><Button title='show' onClick={openClassDetailDialog} /></div>	
				<div style={{display:'flex', flexDirection:'row'}}>capacita di classe <Button title='show' onClick={openCapacityDialog} /><Button title='aggiungi' onClick={openAddCapacityDialog} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>incantesimi <Button title='show' onClick={openSpeelDialog} /><Button title='aggiungi' onClick={openAddSpellDialog} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>talenti bonus <Button title='show' onClick={openBonusFeatsDialog} /></div>
				<ClassDialog classe={classe} open={classDetailDialog} handleClose={closeClassDetailDialog}/>
				<BonusFeatsDialog open={bonusFeatsDialog} handleClose={closeBonusFeatsDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse}/>
				<SpellDialog open={speelDialog} handleClose={closeSpeelDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse} />
				<CapacityDialog open={capacityDialog} handleClose={closeCapacityDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse} />
				<AddCapacityDialog open={addCapacityDialog} handleClose={closeAddCapacityDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse}  />
				<AddSpellDialog open={addSpellDialog} handleClose={closeAddSpellDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse}/>
			</div>
	);
}

export default ClassListElement;