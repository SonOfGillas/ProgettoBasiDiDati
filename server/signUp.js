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

			const query = "INSERT INTO Utenti (Email,Password) VALUES ('" + event['Email'] + "','" + event['Password'] + "')";

			db.connect();

			db.query(query, (err, result) => {
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
			body: JSON.stringify('query failed')
		};
	}

	return response;
};
