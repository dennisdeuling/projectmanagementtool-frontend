const initialState = {
	change: {},
	loggedInUser: {}
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
					_id: action.payload.loggedInUser._id,
					name: action.payload.loggedInUser.name,
					email: action.payload.loggedInUser.email,
					position: action.payload.loggedInUser.position,
					// passwordHashed: action.payload.loggedInUser.passwordHashed,
				},
				projectmanagers: [...action.payload.loggedInUser.projectmanagers],
				clients: [...action.payload.loggedInUser.clients],
				projects: [...action.payload.loggedInUser.projects],
				tickets: [...action.payload.loggedInUser.tickets],
				loading: false,
				error: null
			};
		case 'FETCH_USER_FAILURE':
			return {
				change: {},
				loggedInUser: {},
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
};

export default authReducer;
