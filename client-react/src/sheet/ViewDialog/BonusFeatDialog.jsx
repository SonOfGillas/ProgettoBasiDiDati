import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState,useCallback,useEffect } from 'react';
import axios from 'axios'

function FeatsDialog (props) {
	const [ bonusFeats, setBonusFeats ] = useState();

	const getBonusFeatsApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class/bonusfeat';
	const getBonusFeats = useCallback(
		() => {
			const data = { CodPer: props.CodPer, Classe: props.NomeClasse };

			axios
				.post(getBonusFeatsApi, data)
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

    const deleteBonusFeatApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/deletefromsheet/class/bonusfeats';
	const deleteBonusFeat = useCallback(
		(NomeTalento) => {
			const data = { CodPer: props.CodPer, NomeClasse: props.NomeClasse, NomeTalento:NomeTalento};

			axios
				.post(deleteBonusFeatApi, data)
				.then((response) => {
					console.log(response);
					props.handleClose();
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
            getBonusFeats()
        }

    },[getBonusFeats, props])


    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Lista Talenti Bonus
        </DialogTitle>
        <DialogContent> 
            {bonusFeats && bonusFeats.map((bonusFeat,index)=>
                <div key={index}>
                    <h4>Nome: {bonusFeat.Nome}</h4>
                    <p>Descrizione: {bonusFeat.Descrizione}</p>
                    <Button onClick={()=>deleteBonusFeat(bonusFeat.Nome)} color="primary">
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

export default FeatsDialog;