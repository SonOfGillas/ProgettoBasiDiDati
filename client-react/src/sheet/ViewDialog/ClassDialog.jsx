import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

function ClassDialog (props) {

    const classe = props.classe;

    return(
        <Dialog open={props.open} onClose={ props.handleClose}>
        <DialogTitle>
            Dettaglio Classe
        </DialogTitle>
        <DialogContent> 
         <div>
          <h4>{classe.NomeClasse} Livello {classe.Livello}</h4>
          <p>DadoVita: {classe.DadoVita}</p>
          <p>BAB: {classe.BAB}</p>
          <p>Riflessi: {classe.Riflessi}</p>
          <p>Tempra: {classe.Tempra}</p>
          <p>Volonta: {classe.Volonta}</p>
          <p>Competenza Armature: {traslateCompArmature(classe.CompArmature)}</p>
          <p>Competenza Scudi: {traslateCompScudi(classe.CompScudi)}</p>
          <p>Competenza Armi Esotiche: {classe.CompArmiEsotiche==1?'si':'no'}</p>
          <p>Competenza Armi Guerra: {classe.CompArmiGuerra==1?'si':'no'}</p>
            </div>
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