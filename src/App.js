import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-json-inspector/json-inspector.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DefaultLayout from './components/layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logout } from './redux/actions/userActions';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import axios from 'axios';
import Messages from './components/common/Messages';
import { toastr } from 'react-redux-toastr';
import FichaConsult from './pages/Consult/FichaConsult';

if (localStorage.getItem('token')) {
	const token = localStorage.getItem('token');
	setAuthToken(token);
	const decoded = jwtDecode(token);

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logout());
		window.location.href = '/';
	}
	store.dispatch(setCurrentUser(decoded));
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//https://podo-backend.herokuapp.com/api/
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

axios.interceptors.request.use(
	(config) => {
		if (!config.url.endsWith('/login')) {
			console.log('Entrando no request interceptor...');
			const token = localStorage.getItem('token');
			const decoded = jwtDecode(token);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				store.dispatch(logout());
				window.location.href = '/';
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log('response interceptor', response);
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			toastr.error('Sessão expirada faça login novamente');
			store.dispatch(logout());
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Messages />
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/inicio" component={DefaultLayout} />
						<Route path="/ficha/:id" component={FichaConsult} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
