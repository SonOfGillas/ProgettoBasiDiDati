import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState,useCallback,useEffect } from 'react';
import axios from 'axios'

function FeatsDialog (props) {
	const [ feats, setFeats ] = useState();

	const getBonusFeatsApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class/bonusfeat';
	const getBonusFeats = useCallback(
		() => {
			const data = { CodPer: props.CodPer, NomeClasse: props.NomeClasse };

			axios
				.post(getBonusFeatsApi, data)
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

    useEffect(()=>{
        getBonusFeats()
    },[])


    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Lista Talenti Bonus
        </DialogTitle>
        <DialogContent> 
            {feats && feats.map((feat,index)=>
                <div key={index}>
                    <h4>{feat.Nome}</h4>
                    <p>{feat.Descrizione}</p>
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