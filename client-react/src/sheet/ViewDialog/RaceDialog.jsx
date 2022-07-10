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

	const [ raceInfo, setRaceInfo ] = useState(false);

	const getRaceApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/race';
	const getRace = useCallback(
		() => {
			const data = { Razza: props.Razza };

			axios
				.post(getRaceApi, data)
				.then((response) => {
					console.log(response);
					setRaceInfo(response.data.body);
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
        getRace()
      }
    },[getRace, props])

    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Dettaglio Razza
        </DialogTitle>
        <DialogContent> 
        {raceInfo && raceInfo.race && <div>
          <h4>{raceInfo.race[0].Nome}</h4>
          <p>Taglia:{traslateSize(raceInfo.race[0].Taglia)}</p>
          <p>Velocita:{raceInfo.race[0].Velocita}m</p>
          <p>ModCarisma:{raceInfo.race[0].ModCarisma}</p>
          <p>ModCostituzione:{raceInfo.race[0].ModCostituzione}</p>
          <p>ModDestrezza:{raceInfo.race[0].ModDestrezza}</p>
          <p>ModForza:{raceInfo.race[0].ModForza}</p>
          <p>ModIntelligenza:{raceInfo.race[0].ModIntelligenza}</p>
          <p>ModSaggezza:{raceInfo.race[0].ModSaggezza}</p>
        </div>}
        {raceInfo && raceInfo.raceTraits && <div>
          <h4>Tratti Raziali</h4>
          {raceInfo.raceTraits.map((trait,index) => <div key={index}>
            <h5>Nome:{trait.Nome}</h5>
            <p>Descrizione:{trait.Descrizione}</p>
          </div>)}
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

const traslateSize = (taglia) => {
  switch(taglia){
    case -4:
      return 'Piccolissima'
    case -3:
      return 'Minuta'
    case -2:
      return 'Minuscola'
    case -1:
      return 'Piccola'
    case 0:
      return 'Media'
    case 1:
      return 'Grande'
    case 2:
      return 'Enorme'
    case 3:
        return 'Mastodontica'
    case 4:
      return 'Colossale'
  }
}

export default RaceDialog;