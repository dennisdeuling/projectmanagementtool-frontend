const initialState = {
};

const actionReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT_REQUEST':
			return {
				...state,
				error: null
			};
		case 'EDIT_SUCCESS':
			return {
				...state,
				projectmanagers: [...action.payload.projectmanagers],
				error: null
			};
		case 'EDIT_FAILURE':
			return {
				...state,
				error: action.payload.error
			};
		default:
			return state;
	}
};
export default actionReducer;
