const connectToDb = require('./connect-to-db.js');

connectToDb.connect();
/*
exports.handler = async (event) => {
	const response = connectToDb.connect();

	console.log('EVENT: \n' + JSON.stringify(event, null, 2));

	return response;
};
*/
