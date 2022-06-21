const connectToDb = require('./connect-to-db.js');

connectToDb.connect();
/*
exports.handler = async (event) => {
	//console.log('EVENT: \n' + JSON.stringify(event, null, 2));
	const response = await connectToDb.connect();
	return response;
};
*/
