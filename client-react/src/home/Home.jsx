import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Home() {
	let params = useParams();
	console.log(params.email);

	const getCharactersApi = 'https://e157zbhd6c.execute-api.us-east-1.amazonaws.com/staging/access/home';

	const getCharacters = () => {
		const data = { Email: params.email };

		axios
			.post(getCharactersApi, data)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	getCharacters();

	return (
		<div>
			<p>home</p>
		</div>
	);
}

export default Home;
