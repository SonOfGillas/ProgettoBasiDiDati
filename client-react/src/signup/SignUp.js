import './SignUp.css';
import axios from 'axios';
import { useState } from 'react';
// import AWS from 'aws-sdk';

// AWS.config.loadFromPath('./aws.json');
// const lamda = new AWS.Lambda();

function SignUp() {
	const loginApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/access/login';
	const signupApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/access/signup';

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const login = () => {
		const data = {
			Email: email,
			Password: password
		};

		axios
			.post(loginApi, data)
			.then((response) => {
				console.log(response);
				const utenti = response.data.body;
				if (utenti.lenght() > 0) {
					console.log('navigazione');
				} else {
					alert('utente non trovato');
				}
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	const signup = () => {
		const data = {
			Email: email,
			Password: password
		};

		axios
			.post(signupApi, data)
			.then((response) => {
				console.log(response);
				alert(response);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	const FormButton = (props) => (
		<div id='button' class='row'>
			<button onClick={props.onClick}>{props.title}</button>
		</div>
	);

	const NavigationButton = (props) => (
		<div id='navigationButton' class='row'>
			<button onClick={login}>{props.title}</button>
		</div>
	);

	return (
		<div className='App'>
			<header className='App-header'>
				<div class='signUpContainer'>
					<label>Email</label>
					<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
					<label>Password</label>
					<input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
					<FormButton onClick={signup} title='Sign Up' />
					<NavigationButton title='Log In' />
				</div>
			</header>
		</div>
	);
}

export default SignUp;
