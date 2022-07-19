
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

			const queryReadArmor = "select  Competenza from Armature where nome ='"+ event['Veste'] +"'";
			const queryGetPGcomp = "select CompArmature from Personaggi where CodPer="+ event['CodPer'];
			const querySetVeste = "UPDATE Personaggi SET Veste = '"+event['Veste']+"' WHERE CodPer = "+event['CodPer'];
			
            db.connect();


			db.query(queryReadArmor, (err, armorComp) => {
				if (err) throw err;
				db.query(queryGetPGcomp, (err, pgComp) => {
					if (err) throw err;
					if(armorComp[0].Competenza<=pgComp[0].CompArmature){
						db.query(querySetVeste, (err, result) => {
							if (err) throw err;
							db.end();
							resolve({
								statusCode: 202,
								body: result
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
