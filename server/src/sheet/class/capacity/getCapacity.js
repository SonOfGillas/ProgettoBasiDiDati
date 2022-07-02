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

			const query =
				"SELECT * FROM Capacita WHERE Nome in ( select NomeCapacita from CapacitaClasse where CodPer='" +
				event['CodPer'] +
				"' AND NomeClasse='" +
				event['Classe'] +
				"' );";

			db.connect();

			db.query(queryArmor, (err, result) => {
				if (err) throw err;
				db.end();
				resolve({
					statusCode: 202,
					body: result
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
