import Button from '../components/Button';

function ClassListElement(props) {
	const classe = props.classe;

	return (
			<div style={{ display: 'flex', flexDirection:'row', border:5, borderStyle:'solid',padding:30 }}>
				<div>{classe.NomeClasse} livello {classe.Livello} <Button title='show' onClick={()=>{}} /></div>	
			</div>
	);
}

export default ClassListElement;
