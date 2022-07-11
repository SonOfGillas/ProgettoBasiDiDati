import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function ClassDialog (props) {
    const classe = props.classe;
    const [detailClass,setDetailClass] = useState(); 

    const addClassDetailApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/sheet/class/detail';
    const addClassDetail = useCallback(
      () => {
        const data = {
          NomeClasse: classe.NomeClasse,
        };
  
        axios
          .post(addClassDetailApi, data)
          .then((response) => {
            console.log(response);
            setDetailClass(response.data.body[0])
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      },
      [ setDetailClass ]
    );

    useEffect(()=>{
      if(props.open){
        addClassDetail()
      }
    },[addClassDetail, props])

    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Dettaglio Classe
        </DialogTitle>
        <DialogContent> 
          {detailClass &&  <div>
          <h4>{classe.NomeClasse} Livello {classe.Livello}</h4>
          <p>DadoVita: {detailClass.DadoVita}</p>
          <p>BAB: {parseInt(detailClass.BAB*classe.Livello)}</p>
          <p>Riflessi: {parseInt(detailClass.Riflessi*classe.Livello)}</p>
          <p>Tempra: {parseInt(detailClass.Tempra*classe.Livello)}</p>
          <p>Volonta: {parseInt(detailClass.Volonta*classe.Livello)}</p>
          <p>Competenza Armature: {traslateCompArmature(detailClass.CompArmature)}</p>
          <p>Competenza Scudi: {traslateCompScudi(detailClass.CompScudi)}</p>
          <p>Competenza Armi Esotiche: {detailClass.CompArmiEsotiche==1?'si':'no'}</p>
          <p>Competenza Armi Guerra: {detailClass.CompArmiGuerra==1?'si':'no'}</p>
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

export const traslateCompArmature = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'leggere'
		case 2: return 'medie'
		case 3: return 'pesanti'
	}
}

export const traslateCompScudi = (competenza)=>{
	switch(competenza){
		case 0: return 'nessuna'
		case 1: return 'piccoli'
		case 2: return 'grandi'
	}
}

export default ClassDialog;