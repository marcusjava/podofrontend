import {
	FETCH_CLIENT_REQUEST,
	FETCH_CLIENT_SUCCESS,
	UPDATE_CLIENT_SUCCESS,
	FETCH_CLIENT_ERROR,
	FETCH_CLIENTS_REQUEST,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_ERROR,
} from '../types';

import axios from 'axios';

export const saveClient = (data) => (dispatch) => {
	dispatch({ type: FETCH_CLIENT_REQUEST });

	return axios
		.post('/clients/register', data)
		.then((response) => {
			dispatch({ type: FETCH_CLIENT_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_CLIENT_ERROR, payload: error.response.data });
		});
};

export const updateClient = (data, id) => (dispatch) => {
	dispatch({ type: FETCH_CLIENT_REQUEST });

	return axios
		.put(`/clients/${id}`, data)
		.then((response) => {
			dispatch({ type: UPDATE_CLIENT_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_CLIENT_ERROR, payload: error.response.data });
		});
};

export const getClient = (id) => (dispatch) => {
	dispatch({ type: FETCH_CLIENT_REQUEST });

	return axios
		.get(`/clients/${id}`)
		.then((response) => {
			dispatch({ type: FETCH_CLIENT_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_CLIENT_ERROR, payload: error.response.data });
		});
};

export const Clients = (query) => (dispatch) => {
	dispatch({ type: FETCH_CLIENTS_REQUEST });

	return axios
		.get('/clients', { params: query })
		.then((response) => {
			dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_CLIENTS_ERROR, payload: error.response.data });
		});
};
