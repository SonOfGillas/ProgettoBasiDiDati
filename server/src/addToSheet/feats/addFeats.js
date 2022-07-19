
const mysql = require('mysql');

exports.handler = async (event) => {
	let response;

	try {
		response = new Promise((resolve) => {
			const db = mysql.createConnection({
				host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
				port: '3306',
				user: 'admin',
				password: 'ineedtopass3exams',
				database: 'Pathfinder_Sheets'
			});

			const queryStatPG = "select Forza,Destrezza,Costituzione,Intelligenza,Saggezza,Carisma from Personaggi where CodPer="+event['CodPer'];
			const queryRequiredStat = "select ForzaRichiesta,DestrezzaRichiesta,CostituzioneRichiesta,IntelligenzaRichiesta,SaggezzaRichiesta,CarismaRichiesto from Talenti where Nome='"+event['NomeTalento']+"'";
			const queryPgFeat = "select NomeTalento from TalentiAppresi where CodPer="+event['CodPer'];
			const queryPgBonusFeat = "select NomeTalento from TalentiBonus where CodPer="+event['CodPer'];
			const queryRequiredFeat = "select NomeTalentoRichiesto from Prerequisiti where NomeTalento='"+event['NomeTalento']+"'";
			const queryAddFeat ="INSERT INTO  TalentiAppresi(CodPer,NomeTalento) VALUES ("+event['CodPer']+",'"+event['NomeTalento']+"');"
			
      db.connect();

	  db.query(queryStatPG, (err, statPG) => {
			if (err) throw err;
			db.query(queryRequiredStat, (err, requiredStat) => {
				if (err) throw err;

				
				if(
					requiredStat[0].ForzaRichiesta <= statPG[0].Forza   &&
					requiredStat[0].DestrezzaRichiesta <= statPG[0].Destrezza   &&
					requiredStat[0].CostituzioneRichiesta <= statPG[0].Costituzione   &&
					requiredStat[0].IntelligenzaRichiesta <= statPG[0].Intelligenza   &&
					requiredStat[0].SaggezzaRichiesta <= statPG[0].Saggezza   &&
					requiredStat[0].CarismaRichiesto <= statPG[0].Carisma 
				){
					db.query(queryPgFeat, (err, pgFeat) => {
						if (err) throw err;
						db.query(queryPgBonusFeat, (err, bonusFeat) => {
								if (err) throw err;
								db.query(queryRequiredFeat, (err, requiredFeat) => {
									if (err) throw err;
									const allPgFeat = [];
									pgFeat.map(feat=>allPgFeat.push(feat.NomeTalento))
									bonusFeat.map(feat=>allPgFeat.push(feat.NomeTalento))
									const requiredFeatList=requiredFeat.map(feat=>feat.NomeTalentoRichiesto)
									const pgHaveAllRequiredFeats = requiredFeatList.reduce(
										(pgHaveAllRequiredFeats, currentValue) => {
											if(pgHaveAllRequiredFeats){
												return allPgFeat.includes(currentValue)
											} else {
												return pgHaveAllRequiredFeats
											}
										},
										true
									  );
									if(pgHaveAllRequiredFeats){
										db.query(queryAddFeat, (err, addFeat) => {
											if (err) throw err;
												resolve({
													statusCode: 202,
													body: addFeat
												});
											});
									} else {
										resolve({
											statusCode: 403,
											body: 'il personaggio non ha tutti i talenti necessari per prendere questo talento'
										});
									}
									});
							});
						});
				} else {
					resolve({
						statusCode: 403,
						body: 'il personaggio non ha le statistiche necessarie per prendere questo talento'
					});
				}
				
				});
			});
	});

	} catch (e) {
		console.log(e);
		response = {
			statusCode: 500,
			body: e
		};
	}

	return response;
};
