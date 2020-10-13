import {
	FETCH_PROCEDURE_REQUEST,
	FETCH_PROCEDURE_SUCCESS,
	UPDATE_PROCEDURE_SUCCESS,
	FETCH_PROCEDURE_ERROR,
	FETCH_PROCEDURES_REQUEST,
	FETCH_PROCEDURES_SUCCESS,
	FETCH_PROCEDURES_ERROR,
} from '../types';

import axios from 'axios';

export const saveProcedure = (data) => (dispatch) => {
	dispatch({ type: FETCH_PROCEDURE_REQUEST });

	return axios
		.post('/procedures', data)
		.then((response) => {
			dispatch({ type: FETCH_PROCEDURE_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_PROCEDURE_ERROR, payload: error.response.data });
		});
};

export const updateProcedure = (data, id) => (dispatch) => {
	dispatch({ type: FETCH_PROCEDURE_REQUEST });

	return axios
		.put(`/procedures/${id}`, data)
		.then((response) => {
			console.log(response.data);
			dispatch({ type: UPDATE_PROCEDURE_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_PROCEDURE_ERROR, payload: error.response.data });
		});
};

export const Procedures = () => (dispatch) => {
	dispatch({ type: FETCH_PROCEDURES_REQUEST });

	return axios
		.get('/procedures')
		.then((response) => {
			dispatch({ type: FETCH_PROCEDURES_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_PROCEDURES_ERROR, payload: error.response.data });
		});
};

export const searchProcedures = (input) => (dispatch) => {
	dispatch({ type: FETCH_PROCEDURES_REQUEST });

	return axios
		.get(`/procedures/search/?search=${input}`)
		.then((response) => {
			dispatch({ type: FETCH_PROCEDURES_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_PROCEDURES_ERROR, payload: error.response.data });
		});
};
