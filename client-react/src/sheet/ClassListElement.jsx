import Button from '../components/Button';
import ClassDialog from './ClassDialog';
import { useState } from 'react';

function ClassListElement(props) {
	const classe = props.classe;

	const [openClassDetail, setOpenClassDetail] = useState(false);

	return (
			<div style={{ display: 'flex',flexDirection:'column', border:5, borderStyle:'solid',padding:30, marginBottom:10 }}>
				<div style={{display:'flex', flexDirection:'row'}}><h4>{classe.NomeClasse} livello {classe.Livello}</h4><Button title='show' onClick={()=>{setOpenClassDetail(true)}} /></div>	
				<div style={{display:'flex', flexDirection:'row'}}>capacita di classe <Button title='show' onClick={()=>{}} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>incantesimi <Button title='show' onClick={()=>{}} /></div>
				<div style={{display:'flex', flexDirection:'row'}}>talenti bonus <Button title='show' onClick={()=>{}} /></div>
				<ClassDialog classe={classe} open={openClassDetail} handleClose={()=>{setOpenClassDetail(false)}}></ClassDialog>
			</div>
	);
}

export default ClassListElement;