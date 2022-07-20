
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

			const queryReadShield = "select  Competenza,BonusCA  from Scudi where nome ='"+ event['Imbraccia'] +"'";
			const queryPgInfo = "select Destrezza,Taglia,CompScudi from Personaggi as P,Razze as R where R.Nome = P.Razza and P.CodPer="+ event['CodPer'];
			const getCaArmor = "select  BonusCA from Armature where nome =(select Veste from Personaggi where CodPer="+event['CodPer']+")";
			
            db.connect();


			db.query(queryReadShield, (err, shieldInfo) => {
				if (err) throw err;
				db.query(queryPgInfo, (err, pgInfo) => {
					if (err) throw err;
					const compShield = shieldInfo.length>0?shieldInfo[0].Competenza:0;
					const bonusShield =  shieldInfo.length>0?shieldInfo[0].BonusCA:0;
					if(compShield<=pgInfo[0].CompScudi){
						db.query(getCaArmor, (err, caArmor) => {
							if (err) throw err;
							const bonusArmor = caArmor.length>0?caArmor[0].BonusCA:0;
							const CA = 10 + bonusShield + bonusArmor + (pgInfo[0].Destrezza-10/2) - pgInfo[0].Taglia
							const queryUpdatePG = "UPDATE Personaggi SET Imbraccia ='"+event['Imbraccia']+"',CA="+CA+" WHERE CodPer = "+event['CodPer'];
							db.query(queryUpdatePG, (err, result ) => {
								if (err) throw err;
								db.end();
										resolve({
											statusCode: 202,
											body: result
										});
							});
						});
					} else {
						db.end();
						resolve({
							statusCode: 403,
							body: 'Il personaggio non ha la competenze adatta per indossare questa armatura'
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
