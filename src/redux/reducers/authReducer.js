const initialState = {
	change: {},
	loggedInUser: {},
	projectmanagers: []
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_USER_REQUEST':
			return {
				...state,
				loading: true,
				error: null
			};
		case 'FETCH_USER_SUCCESS':
			return {
				change: {},
				loggedInUser: {
					id: action.payload.user._id,
					name: action.payload.user.name,
					email: action.payload.user.email,
					position: action.payload.user.position
				},
				projectmanagers: [...action.payload.projectmanagers],
				loading: false,
				error: null
			};
		case 'FETCH_USER_FAILURE':
			return {
				change: {},
				loggedInUser: {},
				projectmanagers: {},
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
};

export default authReducer;
