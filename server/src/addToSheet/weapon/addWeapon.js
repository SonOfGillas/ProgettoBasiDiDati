
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

			const queryCompWeapon = "select  CompetenzaArmiGuerra,CompetenzaArmiEsotiche from Armi where nome ='"+ event['Nome'] +"'";
			const queryGetPGcomp = "select CompeArmiGuerra,CompeArmiEsotiche from Personaggi where CodPer="+ event['CodPer'];
			const queryAddWeapon = "INSERT INTO  Equipaggiamento(CodPer,Nome) VALUES ("+event['CodPer']+",'"+event['Nome']+"');";

      db.connect();

		db.query(queryCompWeapon, (err,compWeapon) => {
				if (err) throw err;
				db.query(queryGetPGcomp, (err, pgComp) => {
					if (err) throw err;
					if(
						compWeapon[0].CompetenzaArmiGuerra <= pgComp[0].CompeArmiGuerra &&
						compWeapon[0].CompetenzaArmiEsotiche <= pgComp[0].CompeArmiEsotiche
						){
						db.query(queryAddWeapon, (err, result) => {
							if (err) throw err;
							db.end();
							resolve({
								statusCode: 202,
								body: result
							});
						});
					}else{
						db.end();
						resolve({
							statusCode: 403,
							body: 'il personaggio non ha le competenze per usare quest arma'
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