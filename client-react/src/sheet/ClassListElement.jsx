import Button from '../components/Button';
import ClassDialog from './ViewDialog/ClassDialog';
import { useState, useCallback } from 'react';
import BonusFeatsDialog from './ViewDialog/BonusFeatDialog';
import SpellDialog from './ViewDialog//SpellDialog';
import CapacityDialog from './ViewDialog/CapacityDialog';
import AddSpellDialog from './AddDialog/AddSpell';
import AddBonusFeatDialog from './AddDialog/AddBonusFeat';
import AddLevelDialog from './AddDialog/SetClassLevel';
import axios from 'axios';

function ClassListElement(props) {
	const classe = props.classe;
	const CodPer = props.CodPer;

	const [ classDetailDialog, setClassDetailDialog ] = useState(false);
	const [ bonusFeatsDialog, setBonusFeatsDialog ] = useState(false);
	const [ speelDialog, setSpeelDialog ] = useState(false);
	const [ capacityDialog, setCapacityDialog ] = useState(false);
	const [ addSpellDialog, setAddSpellDialog ] = useState(false);
	const [ addBonusFeatDialog, setAddBonusFeatDialog ] = useState(false);
	const [ addLevelDialog, setAddLevelDialog ] = useState(false);

	const openClassDetailDialog = useCallback(() => setClassDetailDialog(true));
	const closeClassDetailDialog = useCallback(() => setClassDetailDialog(false));
	const openBonusFeatsDialog = useCallback(() => setBonusFeatsDialog(true));
	const closeBonusFeatsDialog = useCallback(() => setBonusFeatsDialog(false));
	const openSpeelDialog = useCallback(() => setSpeelDialog(true));
	const closeSpeelDialog = useCallback(() => setSpeelDialog(false));
	const openCapacityDialog = useCallback(() => setCapacityDialog(true));
	const closeCapacityDialog = useCallback(() => setCapacityDialog(false));
	const openAddSpellDialog = useCallback(() => setAddSpellDialog(true));
	const closeAddSpellDialog = useCallback(() => setAddSpellDialog(false));
	const openBonusFeatDialog = useCallback(() => setAddBonusFeatDialog(true));
	const closeBonusFeatDialog = useCallback(() => setAddBonusFeatDialog(false));
	const openLevelDialog = useCallback(() => setAddLevelDialog(true));
	const closeLevelDialog = useCallback(() => setAddLevelDialog(false));

	const deleteClassApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/deletefromsheet/class';
	const deleteClass = useCallback(
		() => {
			const data = { CodPer: CodPer, NomeClasse: classe.NomeClasse };

			axios
				.post(deleteClassApi, data)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ CodPer, classe.NomeClasse ]
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				border: 5,
				borderStyle: 'solid',
				padding: 30,
				marginBottom: 10
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<h4>
					{classe.NomeClasse} livello {classe.Livello}
				</h4>
				<Button title='show' onClick={openClassDetailDialog} />
				<Button title='setLevel' onClick={openLevelDialog} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				capacita di classe <Button title='show' onClick={openCapacityDialog} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				incantesimi <Button title='show' onClick={openSpeelDialog} />
				<Button title='aggiungi' onClick={openAddSpellDialog} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				talenti bonus <Button title='show' onClick={openBonusFeatsDialog} />
				<Button title='aggiungi' onClick={openBonusFeatDialog} />
			</div>
			<ClassDialog classe={classe} open={classDetailDialog} handleClose={closeClassDetailDialog} />
			<BonusFeatsDialog
				open={bonusFeatsDialog}
				handleClose={closeBonusFeatsDialog}
				CodPer={CodPer}
				NomeClasse={classe.NomeClasse}
			/>
			<SpellDialog open={speelDialog} handleClose={closeSpeelDialog} CodPer={CodPer} NomeClasse={classe.NomeClasse} />
			<CapacityDialog open={capacityDialog} handleClose={closeCapacityDialog} classe={classe} />
			<AddSpellDialog
				open={addSpellDialog}
				handleClose={closeAddSpellDialog}
				CodPer={CodPer}
				NomeClasse={classe.NomeClasse}
			/>
			<AddBonusFeatDialog
				open={addBonusFeatDialog}
				handleClose={closeBonusFeatDialog}
				CodPer={CodPer}
				NomeClasse={classe.NomeClasse}
			/>
			<AddLevelDialog
				open={addLevelDialog}
				handleClose={closeLevelDialog}
				CodPer={CodPer}
				NomeClasse={classe.NomeClasse}
			/>
		</div>
	);
}

export default ClassListElement;
