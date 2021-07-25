const initialState = {
};

const actionReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_REQUEST':
			return {
				...state,
				error: null
			};
		case 'ADD_SUCCESS':
			return {
				...state,
				projectmanagers: [...action.payload.projectmanagers],
				error: null
			};
		case 'ADD_ERROR':
			return {
				...state,
				error: action.payload.error
			};
		case 'DELETE_REQUEST':
			return {
				...state,
				error: null
			};
		case 'DELETE_SUCCESS':
			return {
				...state,
				projectmanagers: [...action.payload.projectmanagers],
				error: null
			};
		case 'DELETE_ERROR':
			return {
				...state,
				error: action.payload.error
			};
		default:
			return state;
	}
};
export default actionReducer;
