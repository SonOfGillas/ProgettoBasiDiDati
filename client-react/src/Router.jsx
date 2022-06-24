import React from 'react';
import './index.css';
import SignUp from './signup/SignUp';
import Home from './home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignUp />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
