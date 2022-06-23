import './SignUp.css';
import axios from 'axios';
import { useState } from 'react';
// import AWS from 'aws-sdk';

// AWS.config.loadFromPath('./aws.json');
// const lamda = new AWS.Lambda();

function SignUp() {
	const api = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging';
	//const data = { name: 'mike' };

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const SignUp = () => {
		const data = {
			Email: email,
			Password: password
		};

		axios
			.get(api, data)
			.then((response) => {
				console.log(response);
				alert(response);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	const FormInput = (props) => (
		<div class='row'>
			<label>{props.description}</label>
			<input type='text' value={props.value} onChange={(e) => props.onChange(e.target.value)} />
		</div>
	);

	const FormButton = (props) => (
		<div id='button' class='row'>
			<button onClick={props.onClick}>{props.title}</button>
		</div>
	);

	const NavigationButton = (props) => (
		<div id='navigationButton' class='row'>
			<button>{props.title}</button>
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
					<FormButton onClick={SignUp} title='Sign Up' />
					<NavigationButton title='Log In' />
				</div>
			</header>
		</div>
	);
}

export default SignUp;
