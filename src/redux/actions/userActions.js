import {
	SET_USER,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	UPDATE_USER_SUCCESS,
	FETCH_USER_ERROR,
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	LOADING_USER,
} from '../types';

import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import { toastr } from 'react-redux-toastr';

import axios from 'axios';

export const login = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_USER });

	return axios
		.post('/users/login', userData)
		.then((user) => {
			const { token } = user.data;
			localStorage.setItem('token', token);
			setAuthToken(token);
			const decoded = jwtDecode(token);
			dispatch(setCurrentUser(decoded));
			history.push('/inicio');
		})
		.catch((error) => {
			toastr.error('Erro ao efetuar o login', error.response.data.message);
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const logout = (history) => (dispatch) => {
	localStorage.removeItem('token');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	//history.push('/');
};

export const register = (data) => (dispatch) => {
	dispatch({ type: FETCH_USER_REQUEST });

	return axios
		.post('/users/register', data)
		.then((response) => {
			if (response.status === 201) {
				dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
			}
		})
		.catch((error) => {
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const updateUser = (data, id) => (dispatch) => {
	dispatch({ type: FETCH_USER_REQUEST });

	return axios
		.put(`/users/${id}`, data)
		.then((response) => {
			dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const getUsers = () => (dispatch) => {
	dispatch({ type: FETCH_USERS_REQUEST });
	return axios
		.get('/users')
		.then((response) => {
			dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
		})
		.catch((error) => dispatch({ type: FETCH_USERS_ERROR, payload: error.response.data }));
};

export const change_pwd = (data, id) => (dispatch) => {
	dispatch({ type: FETCH_USER_REQUEST });
	return axios
		.put(`/users/${id}/change_pwd`, data)
		.then((response) => {
			console.log(response.data);
			if (response.status === 200) {
				dispatch({ type: FETCH_USER_SUCCESS, payload: {} });
			}
		})
		.catch((error) => {
			dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
		});
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_USER,
		payload: decoded,
	};
};
