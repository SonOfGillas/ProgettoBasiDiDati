const connectToDb = require('./connect-to-db.js');

connectToDb.connect();

/*
exports.handler = async (event) => {
	//console.log('EVENT: \n' + JSON.stringify(event, null, 2));
	return {
			statusCode: 200,
			body: JSON.stringify('Database connected')
		};
};
*/
