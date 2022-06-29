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

			const queryArmor = "SELECT * FROM Armature WHERE Nome = '"+ event['Veste'] +"'";
            const queryShild = "SELECT * FROM Scudi WHERE Nome = '"+ event['Imbraccia'] +"'";
            const queryWeapons = "SELECT * FROM Armi WHERE Nome IN (SELECT Nome FROM Equipaggiamento WHERE CodPer = "+ event['CodPer']+")";

            let responseArmor,responseShild,responseWeapons;

			db.connect();

			db.query(queryArmor, (err, result) => {
				if (err) throw err;
				responseArmor=result;
				 db.query(queryShild, (err, result) => {
					if (err) throw err;
					responseShild=result;
					  db.query(queryWeapons, (err, result) => {
						if (err) throw err;
						responseWeapons=result;
						db.end();
						resolve({
			               statusCode: 202,
			               body: {
			                   armor: responseArmor,
			                   shild: responseShild,
			                   weapons: responseWeapons,
			               }
			            });
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