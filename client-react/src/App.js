import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import AWS from 'aws-sdk';

// AWS.config.loadFromPath('./aws.json');
// const lamda = new AWS.Lambda();

function App() {
	const api = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging';
	//const data = { name: 'mike' };
	// const headers = {
	// 	'Content-Type': 'application/json',
	// 	'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
	// 	'Access-Control-Allow-Methods': 'OPTIONS,POST',
	// 	'Access-Control-Allow-Credentials': true,
	// 	'Access-Control-Allow-Origin': '*',
	// 	'X-Requested-With': '*'
	// };
	// const params = {
	// 	headers: headers,
	// 	responseType: 'json'
	// };

	const connectTodDB = () => {
		axios
			.options(api)
			.then((response) => {
				console.log(response);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
				<button onClick={connectTodDB}>API request</button>
			</header>
		</div>
	);
}

export default App;
