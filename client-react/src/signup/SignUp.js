import './SignUp.css';
import axios from 'axios';
// import AWS from 'aws-sdk';

// AWS.config.loadFromPath('./aws.json');
// const lamda = new AWS.Lambda();

function SignUp() {
	const api = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging';
	//const data = { name: 'mike' };

	const connectTodDB = () => {
		axios
			.get(api)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const FormInput = (props) => (
		<div class='row'>
			<label>{props.description}</label>
			<input type={props.type} placeholder={props.placeholder} />
		</div>
	);

	const FormButton = (props) => (
		<div id='button' class='row'>
			<button>{props.title}</button>
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
					<FormInput description='Email' placeholder='Enter your email' type='text' />
					<FormInput description='Password' placeholder='Enter your password' type='text' />
					<FormButton title='Sign In' />
					<NavigationButton title='Log In' />
					<button onClick={connectTodDB}>API request</button>
				</div>
			</header>
		</div>
	);
}

export default SignUp;
