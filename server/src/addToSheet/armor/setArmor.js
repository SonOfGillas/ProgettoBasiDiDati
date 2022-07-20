
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

			const queryReadArmor = "select  Competenza,BonusCA  from Armature where nome ='"+ event['Veste'] +"'";
			const queryPgInfo = "select Destrezza,Taglia,CompArmature from Personaggi as P,Razze as R where R.Nome = P.Razza and P.CodPer="+ event['CodPer'];
			const getCaShield = "select  BonusCA from Scudi where nome =(select Imbraccia from Personaggi where CodPer="+event['CodPer']+")";
			
            db.connect();


			db.query(queryReadArmor, (err, armorInfo) => {
				if (err) throw err;
				db.query(queryPgInfo, (err, pgInfo) => {
					if (err) throw err;
					const compArmor = armorInfo.length>0?armorInfo[0].Competenza:0;
					const bonusArmor =  armorInfo.length>0?armorInfo[0].BonusCA:0;
					if(compArmor<=pgInfo[0].CompArmature){
						db.query(getCaShield, (err, caShield) => {
							if (err) throw err;
							const bonusShield = caShield.length>0?caShield[0].BonusCA:0;
							const CA = 10+ bonusArmor + bonusShield + (pgInfo[0].Destrezza-10/2) - pgInfo[0].Taglia
							const queryUpdatePG = "UPDATE Personaggi SET Veste ='"+event['Veste']+"',CA="+CA+" WHERE CodPer = "+event['CodPer'];
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
