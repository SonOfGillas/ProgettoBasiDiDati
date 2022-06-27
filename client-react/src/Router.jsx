import React from 'react';
import './index.css';
import SignUp from './signup/SignUp';
import Home from './home/Home';
import Sheet from './sheet/Sheet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignUp />} />
				<Route path='/home/:email' element={<Home />} />
				<Route path='/sheet/:CodPer' element={<Sheet />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
