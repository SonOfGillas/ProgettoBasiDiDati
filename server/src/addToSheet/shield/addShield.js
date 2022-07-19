
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
			
			const queryReadShield = "select  Competenza from Scudi where nome ='"+ event['Imbraccia'] +"'";
			const queryGetPGcomp = "select CompScudi from Personaggi where CodPer="+ event['CodPer'];
			const querySetVeste = "UPDATE Personaggi SET Imbraccia = '"+event['Imbraccia']+"' WHERE CodPer = "+event['CodPer'];

            db.connect();

			db.query(queryReadShield, (err, compShield) => {
				if (err) throw err;
				db.query(queryGetPGcomp, (err, pgComp) => {
					if (err) throw err;
					if(compShield[0].Competenza<=pgComp[0].CompScudi){
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
							body: 'Il personaggio non ha la competenze adatta per imbracciare questo scudo'
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