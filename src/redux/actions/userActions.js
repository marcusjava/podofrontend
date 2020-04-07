import {
	SET_USER,
	SET_ERRORS,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
} from '../types';

import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import { toastr } from 'react-redux-toastr';

import axios from 'axios';

export const login = (userData, history) => dispatch => {
	dispatch({ type: LOADING_USER });

	return axios
		.post('/users/login', userData)
		.then(user => {
			const { token } = user.data;
			localStorage.setItem('token', token);
			setAuthToken(token);
			const decoded = jwtDecode(token);
			dispatch(setCurrentUser(decoded));
			history.push('/inicio');
		})
		.catch(error => {
			toastr.error('Erro ao efetuar o login', JSON.stringify(error.response.data));
			dispatch({ type: SET_ERRORS, payload: error });
		});
};

export const logout = history => dispatch => {
	localStorage.removeItem('token');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	//history.push('/');
};

export const register = data => dispatch => {
	dispatch({ type: FETCH_USER_REQUEST });
	const sendData = new FormData();
	sendData.append('thumbnail', data.thumbnail || null);
	sendData.append('name', data.name);
	sendData.append('phone', data.phone);
	sendData.append('nasc', data.nasc);
	sendData.append('cpf', data.cpf);
	sendData.append('rg', data.rg);
	sendData.append('email', data.email);
	sendData.append('address', JSON.stringify(data.address));
	sendData.append('password', data.password);
	sendData.append('password2', data.password2);
	sendData.append('role', JSON.stringify(data.role));
	sendData.append('status', JSON.stringify(data.status));
	return axios
		.post('/users/register', sendData)
		.then(response => {
			console.log(response);
			if (response.status == '201') {
				dispatch({ type: FETCH_USER_SUCCESS, payload: {} });
				toastr.success('Usuario criado com sucesso');
				dispatch(getUsers());
			}
		})
		.catch(error => {
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const updateUser = data => dispatch => {
	dispatch({ type: FETCH_USER_REQUEST });
	const sendData = new FormData();
	sendData.append('thumbnail', data.thumbnail);
	sendData.append('name', data.name);
	sendData.append('phone', data.phone);
	sendData.append('nasc', data.nasc);
	sendData.append('cpf', data.cpf);
	sendData.append('rg', data.rg);
	sendData.append('email', data.email);
	sendData.append('address', JSON.stringify(data.address));
	sendData.append('role', JSON.stringify(data.role));
	sendData.append('status', JSON.stringify(data.status));

	return axios
		.put(`/users/${data.id}`, sendData)
		.then(response => {
			dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
			toastr.success('Usuario atualizado com sucesso');
			dispatch(getUsers());
		})
		.catch(error => {
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const getUsers = () => dispatch => {
	dispatch({ type: FETCH_USERS_REQUEST });
	return axios
		.get('/users')
		.then(response => {
			dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
		})
		.catch(error => console.log(error));
};

export const change_pwd = (data, id) => dispatch => {
	dispatch({ type: FETCH_USER_REQUEST });
	return axios
		.put(`/users/${id}/change_pwd`, data)
		.then(response => {
			console.log(response.data);
			if (response.status === 200) {
				dispatch({ type: FETCH_USER_SUCCESS, payload: {} });
				toastr.success('Senha atualizada com sucesso');
			}
		})
		.catch(error => {
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const setCurrentUser = decoded => {
	return {
		type: SET_USER,
		payload: decoded,
	};
};
