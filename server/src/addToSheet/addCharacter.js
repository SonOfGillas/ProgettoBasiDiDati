
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
              `INSERT INTO Classi (
                CodPer,
                Nome,
                EmailUser,
                Razza,
                Allineamento,
                HP,
                CA,
                BAB,
                BMC,
                DMC,
                Tempra,
                Riflessi,
                Volonta,
                Forza,
                Destrezza,
                Costituzione,
                Intelligenza,
                Saggezza,
                Carisma,
                CompArmature,
                CompScudi,
                CompArmiGuerra,
                CompeArmiEsotiche,
                ) VALUES (
                `+event['CodPer']+`,
                '`+event['Nome']+`',
                '`+event['EmailUser']+`',
                '`+event['Razza']+`',
                '`+event['Allineamento']+`',
                `+event['HP']+`,
                `+event['CA']+`,
                `+event['BAB']+`,
                `+event['BMC']+`,
                `+event['DMC']+`,
                `+event['Tempra']+`,
                `+event['Riflessi']+`,
                `+event['Volonta']+`,
                `+event['Forza']+`,
                `+event['Destrezza']+`,
                `+event['Costituzione']+`,
                `+event['Intelligenza']+`,
                `+event['Saggezza']+`,
                `+event['Carisma']+`,
                `+event['CompArmature']+`,
                `+event['CompScudi']+`,
                `+event['CompArmiGuerra']+`,
                `+event['CompeArmiEsotiche']+`,
                );`
            
			
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
