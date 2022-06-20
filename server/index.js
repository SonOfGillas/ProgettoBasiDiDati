const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'admin',
	password: 'ineedtopass3exams',
	database: 'Pathfinder_Sheets'
});

db.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Database connected');
});
