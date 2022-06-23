const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'admin',
	password: 'ineedtopass3exams',
	database: 'Pathfinder_Sheets'
});

sql = 'select * from Utenti ';

db.connect(function(err) {
	if (err) throw err;
	console.log('Connected!');
	db.query(sql, function(err, result) {
		if (err) throw err;
		console.log('Result: ');
		console.log(result);
	});
});

/*
exports.handler = async (event) => {
	//console.log('EVENT: \n' + JSON.stringify(event, null, 2));
	const response = await connectToDb.connect();
	return response;
};
*/
