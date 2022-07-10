
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

			const query ="INSERT INTO Classi (NomeClasse,CodPer,Livello,BAB,Tempra,Riflessi,Volonta,DadoVita,CompArmature,CompScudi,CompArmiGuerra,CompArmiEsotiche) VALUES ('"+event['NomeClasse']+"',"+event['CodPer']+","+event['Livello']+","+event['BAB']+","+event['Tempra']+","+event['Riflessi']+","+event['Volonta']+","+event['DadoVita']+","+event['CompArmature']+","+event['CompScudi']+","+event['CompArmiGuerra']+","+event['CompArmiEsotiche']+")";
			
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
			body: e
		};
	}

	return response;
};
