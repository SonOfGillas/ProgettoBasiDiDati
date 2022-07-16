export const traslateSize = (taglia) => {
    switch(taglia){
      case -8:
        return 'Piccolissima'
      case -4:
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
      case 4:
          return 'Mastodontica'
      case 8:
        return 'Colossale'
    }
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
		case 1: return 'scudi piccoli'
		case 2: return 'scudi grandi'
	}
}