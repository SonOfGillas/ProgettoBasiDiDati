import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

function RaceDialog (props) {

	const [ race, setRace ] = useState(false);

	const getRaceApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/race';
	const getRace = useCallback(
		() => {
			const data = { Razza: props.Razza };

			axios
				.post(getRaceApi, data)
				.then((response) => {
					console.log(response);
					setRace(response.data.body);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
		[ props ]
	);

    useEffect(()=>{
        getRace()
    },[])

    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Dettaglio Razza
        </DialogTitle>
        <DialogContent> 
        {race && <div>
            
        </div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={ props.handleClose} color="primary">
           Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default RaceDialog;