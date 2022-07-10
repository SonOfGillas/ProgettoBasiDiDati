import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState,useCallback,useEffect } from 'react';
import axios from 'axios'

function SpellDialog (props) {
	const [ bonusFeats, setBonusFeats ] = useState();

	const getSpellApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class/spell';
	const getSpell = useCallback(
		() => {
			const data = { CodPer: props.CodPer, Classe: props.NomeClasse };

			axios
				.post(getSpellApi, data)
				.then((response) => {
					console.log(response);
					setBonusFeats(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    useEffect(()=>{
        getSpell()
    },[])


    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Lista Spell
        </DialogTitle>
        <DialogContent> 
            {bonusFeats && bonusFeats.map((bonusFeat,index)=>
                <div key={index}>
                    <h4>Nome: {bonusFeat.Nome}</h4>
                    <p>Descrizione: {bonusFeat.Descrizione}</p>
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