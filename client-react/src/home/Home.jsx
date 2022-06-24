import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Home() {
	let params = useParams();

	console.log(params.email);

	return (
		<div>
			<p>home</p>
		</div>
	);
}

export default Home;
