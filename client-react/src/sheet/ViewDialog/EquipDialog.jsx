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
        {equip && <div>
          {equip.armor && 
          <div>
            <h4>Armatura</h4>
            <p>Nome: {equip.armor[0].Nome}</p>
            <p>Bonus alla CA:{equip.armor[0].BonusCA}</p>
            <p>Competenza richiesta: armature {traslateCompArmature(equip.armor[0].Competenza)}</p>
            <p>fallimento incantesimi:{equip.armor[0].FallimentoIncantesimi}%</p>
            <p>penalità alla prova{equip.armor[0].PenalitaProva}</p>
          </div>
          }
          { equip.shild && equip.shild[0] &&
            <div>
              <h4>Scudo</h4>
              <p>Nome: {equip.shild[0].Nome}</p>
              <p>Bonus alla CA:{equip.shild[0].BonusCA}</p>
              <p>Competenza richiesta: {traslateCompScudi(equip.shild[0].Competenza)}</p>
              <p>fallimento incantesimi:{equip.shild[0].FallimentoIncantesimi}%</p>
              <p>penalità alla prova{equip.shild[0].PenalitaProva}</p>
            </div>
          }
          { equip.weapons &&
            <div>
              <h4>Armi</h4>
              {equip.weapons.map((weapon,index)=><div key={index}>
                <h5>Nome: {weapon.Nome}</h5>
                <p>Dado: {weapon.Dado}</p>
                <p>Critico: {weapon.Critico}</p>
                <p>ModTiroColpire: {weapon.ModTiroColpire}</p>
                <p>ModTiroDanni: {weapon.ModTiroDanni}</p>
                <p>Gittata: {weapon.Gittata}</p>
                <p>richiede CompetenzaArmiEsotiche: {weapon.CompetenzaArmiEsotiche?'si':'no'}</p>
                <p>richiede CompetenzaArmiGuerra: {weapon.CompetenzaArmiGuerra?'si':'no'}</p>
              </div>)}
            </div>
          }
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

export default EquipDialog;