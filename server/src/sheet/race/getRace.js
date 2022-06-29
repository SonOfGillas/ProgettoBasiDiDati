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

			const queryRace =
				"Select * FROM Razze WHERE Nome='" + event['Razza'] + "'";
            const queryRaceTraits = "SELECT * FROM Privilegi WHERE Nome IN (SELECT NomePrivilegio FROM PrivilegiRazziali WHERE NomeRazza = '"+ event['Razza'] +"')";

			db.connect();

			db.query(queryRace, (err, resultRace) => {
				if (err) throw err;
                db.query(queryRaceTraits, (err, resultRaceTraits) => {
                    if (err) throw err;
                    db.end();
                    resolve({
                        statusCode: 202,
                        body: {
                            race:resultRace,
                            raceTraits:resultRaceTraits
                        }
                    });
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