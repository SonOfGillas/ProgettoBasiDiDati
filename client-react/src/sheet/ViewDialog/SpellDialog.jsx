import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState,useCallback,useEffect } from 'react';
import axios from 'axios'

function SpellDialog (props) {
	const [ spells, setSpells ] = useState();

	const getSpellApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class/spell';
	const getSpell = useCallback(
		() => {
			const data = { CodPer: props.CodPer, Classe: props.NomeClasse };

			axios
				.post(getSpellApi, data)
				.then((response) => {
					console.log(response);
					setSpells(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    const deleteSpellApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/deletefromsheet/class/spell';
	const deleteSpell = useCallback(
		(NomeIncantesimo) => {
			const data = { CodPer: props.CodPer, NomeClasse: props.NomeClasse, NomeIncantesimo:NomeIncantesimo};

			axios
				.post(deleteSpellApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose()
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    useEffect(()=>{
        if(props.open){
            getSpell()
        }
    },[getSpell,props])


    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Lista Spell
        </DialogTitle>
        <DialogContent> 
            {spells && spells.map((spell,index)=>
                <div key={index}>
                    <h4>Nome: {spell.Nome}</h4>
                    <p>Descrizione: {spell.Descrizione}</p>
                    <Button onClick={()=>deleteSpell(spell.Nome)} color="primary">
                     rimuovi
                    </Button>
            </div>
            )}
        </DialogContent>
        <DialogActions>
          <Button onClick={ props.handleClose} color="primary">
           Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default SpellDialog;