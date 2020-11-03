import {
	SET_CONSULT,
	FETCH_CONSULT_REQUEST,
	FETCH_CONSULT_SUCCESS,
	FETCH_CONSULT_ERROR,
	FETCH_CONSULTS_REQUEST,
	FETCH_CONSULTS_SUCCESS,
	FETCH_CONSULTS_ERROR,
} from '../types';

const initialState = {
	consults: {
		loading: false,
		success: false,
		error: {},
		items: [],
		options: [],
	},
	consult: {
		loading: false,
		success: false,
		error: {},
		item: {},
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CONSULT_REQUEST:
			return {
				...state,
				consult: {
					...state.consult,
					loading: true,
					success: false,
				},
			};
		case FETCH_CONSULT_SUCCESS:
			return {
				...state,
				consult: {
					...state.consult,
					item: action.payload,
					loading: false,
					success: true,
					error: {},
				},
			};

		case FETCH_CONSULT_ERROR:
			return {
				...state,
				consult: {
					...state.consult,
					error: action.payload,
					loading: false,
					success: false,
				},
			};

		case SET_CONSULT:
			return {
				...state,
				consult: {
					...state.consult,
					item: action.payload,
				},
			};

		case FETCH_CONSULTS_REQUEST:
			return {
				...state,
				consults: {
					...state.consults,
					loading: true,
					success: false,
				},
			};
		case FETCH_CONSULTS_SUCCESS:
			return {
				...state,
				consults: {
					...state.consults,
					items: action.payload,
					options: action.payload.map((option) => ({ label: option.name, value: option.id })),
					loading: false,
					success: true,
				},
			};

		case FETCH_CONSULTS_ERROR:
			return {
				...state,
				consults: {
					...state.consults,
					error: action.payload,
					loading: false,
					success: false,
				},
			};

		default:
			return state;
	}
};
