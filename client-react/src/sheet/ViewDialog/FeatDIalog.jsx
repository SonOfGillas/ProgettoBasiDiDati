import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState,useCallback,useEffect } from 'react';
import axios from 'axios'

function BonusFeatsDialog (props) {

	const [ feats, setFeats ] = useState();

	const getFeatsApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/feats';
	const getFeats = useCallback(
		() => {
			const data = { CodPer: props.CodPer };

			axios
				.post(getFeatsApi, data)
				.then((response) => {
					console.log(response);
					setFeats(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    const deleteFeatApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/deletefromsheet/feat';
	const deleteFeat = useCallback(
		(NomeTalento) => {
			const data = { CodPer: props.CodPer, NomeTalento:NomeTalento };

			axios
				.post(deleteFeatApi, data)
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
            getFeats()
        }
    },[getFeats, props])


    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Lista Talenti
        </DialogTitle>
        <DialogContent> 
            {feats && feats.map((feat,index)=>
                <div key={index}>
                    <h4>{feat.Nome}</h4>
                    <p>{feat.Descrizione}</p>
                    <Button onClick={()=>deleteFeat(feat.Nome)} color="primary">
                    Rimuovi
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

export default BonusFeatsDialog;