import {
	FETCH_PROCEDURE_REQUEST,
	FETCH_PROCEDURE_SUCCESS,
	FETCH_PROCEDURE_ERROR,
	FETCH_PROCEDURES_REQUEST,
	FETCH_PROCEDURES_SUCCESS,
	FETCH_PROCEDURES_ERROR,
} from '../types';

const initialState = {
	procedures: {
		loading: true,
		success: false,
		error: {},
		items: [],
		options: [],
	},
	procedure: {
		loading: false,
		success: false,
		error: {},
		item: {},
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PROCEDURE_REQUEST:
			return {
				...state,
				procedure: {
					loading: true,
					success: false,
				},
			};
		case FETCH_PROCEDURE_SUCCESS:
			return {
				...state,
				procedure: {
					item: action.payload,
					loading: false,
					success: true,
				},
			};

		case FETCH_PROCEDURE_ERROR:
			return {
				...state,
				procedure: {
					error: action.payload,
					loading: false,
					success: false,
				},
			};

		case FETCH_PROCEDURES_REQUEST:
			return {
				...state,
				procedures: {
					loading: true,
					success: false,
				},
			};
		case FETCH_PROCEDURES_SUCCESS:
			return {
				...state,
				procedures: {
					items: action.payload,
					options: action.payload.map(option => ({ label: option.name, value: option.id })),
					loading: false,
					success: true,
				},
			};

		case FETCH_PROCEDURES_ERROR:
			return {
				...state,
				procedures: {
					error: action.payload,
					loading: false,
					success: false,
				},
			};

		default:
			return state;
	}
};
