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

			const querySpellCasterClass = "Select Incantatore from DettaglioClasse where NomeClasse='" + event['NomeClasse'] + "'";
			const query =
				'INSERT INTO IncantesimiAppresi (CodPer,NomeClasse,NomeIncantesimo) VALUES (' +
				event['CodPer'] +
				",'" +
				event['NomeClasse'] +
				"','" +
				event['NomeIncantesimo'] +
				"')";

			db.connect();

			db.query(querySpellCasterClass, (err, classInfo) => {
				if (err) throw err;
				if(classInfo[0].Incantatore){
					db.query(query, (err, result) => {
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
							body: 'Questa classe non puo lanciare incantesimi'
						});
				}
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
