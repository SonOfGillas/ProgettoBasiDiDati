const mysql = require('mysql');

exports.handler = async (event) => {
	let response;

	try {
		response = new Promise(() => {
			const db = mysql.createConnection({
				host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
				port: '3306',
				user: 'admin',
				password: 'ineedtopass3exams',
				database: 'Pathfinder_Sheets'
			});

			const sql = 'SELECT * FROM Utenti';

			return db.connect((err) => {
				if (err) throw err;
				//console.log('Connected!');
				return db.query(sql, (err, result) => {
					if (err) throw err;
					console.log('Result: ');
					console.log(result);
					return {
						statusCode: 202,
						body: JSON.stringify(result)
					};
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
