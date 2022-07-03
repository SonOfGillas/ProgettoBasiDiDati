import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

function EquipDialog (props) {

	const [ equip, setEquip ] = useState(false);

	const getEquipApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/equip';
	const getEquip = useCallback(
		() => {
			const data = { CodPer: props.CodPer, Imbraccia: props.Imbraccia,Veste: props.Veste };

			axios
				.post(getEquipApi, data)
				.then((response) => {
					console.log(response);
					setEquip(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    useEffect(()=>{
        getEquip()
    },[])

    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Dettaglio Equippagiamento
        </DialogTitle>
        <DialogContent> 
          <DialogContentText>
            Do you do coding ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ props.handleClose} color="primary">
           Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default EquipDialog;