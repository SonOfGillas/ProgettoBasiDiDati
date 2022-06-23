const mysql = require('mysql');

exports.connect = async () => {
	const db = mysql.createConnection({
		host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
		port: '3306',
		user: 'admin',
		password: 'ineedtopass3exams',
		database: 'Pathfinder_Sheets'
	});
	await db.connect((err) => {
		if (err) {
			console.log(err);
			return {
				statusCode: 505,
				body: JSON.stringify('Failed to connect')
			};
		}
		console.log('Database connected');
		return {
			statusCode: 200,
			body: JSON.stringify('Database connected')
		};
	});
};
