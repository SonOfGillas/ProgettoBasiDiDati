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

			const getRaceCharateristicsMod = "Select ModForza,ModDestrezza,ModCostituzione,ModIntelligenza,ModSaggezza,ModCarisma from Razze where Nome='"+event['Razza']+"'";
			
			db.connect();

			db.query(getRaceCharateristicsMod, (err, raceCharateristicsMod) => {
				if (err) throw err;

				const query =
				"INSERT INTO Personaggi (Nome,EmailUser,Razza,Allineamento,Forza,Destrezza,Costituzione,Intelligenza,Saggezza,Carisma) VALUES ('" +
				event['Nome'] +
				"','" +
				event['EmailUser'] +
				"','" +
				event['Razza'] +
				"','" +
				event['Allineamento'] +
				"'," +
				(parseInt(event['Forza'])+parseInt(raceCharateristicsMod[0].ModForza)) +
				',' +
				(parseInt(event['Destrezza'])+parseInt(raceCharateristicsMod[0].ModDestrezza)) +
				',' +
				(parseInt(event['Costituzione'])+parseInt(raceCharateristicsMod[0].ModCostituzione)) +
				',' +
				(parseInt(event['Intelligenza'])+parseInt(raceCharateristicsMod[0].ModIntelligenza)) +
				',' +
				(parseInt(event['Saggezza'])+parseInt(raceCharateristicsMod[0].ModSaggezza)) +
				',' +
				(parseInt(event['Carisma'])+parseInt(raceCharateristicsMod[0].ModCarisma)) +
				')';

				db.query(query, (err, result) => {
					if (err) throw err;
					db.end();
					resolve({
						statusCode: 202,
						body: result
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
