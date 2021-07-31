const initialState = {
	projectmanager: {}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PROJECTMANAGER_REQUEST':
			return {
				...state,
				loading: true,
				error: null
			};
		case 'FETCH_PROJECTMANAGER_SUCCESS':
			return {
				...state,
				projectmanager: action.payload.projectmanager,
				loading: false,
				error: null
			};
		case 'FETCH_PROJECTMANAGER_ERROR':
			return {
				...state,
				projectmanager: {},
				loading: false,
				error: action.payload.error
			};

		default:
			return state;
	}
};

export default userReducer;
