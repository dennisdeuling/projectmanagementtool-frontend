const authReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_USER_REQUEST':
			return {
				...state,
				loading: true,
				error: null
			};
		case 'FETCH_USER_SUCCESS':
			return {
				loggedInUser: {
					_id: action.payload.loggedInUser._id,
					name: action.payload.loggedInUser.name,
					email: action.payload.loggedInUser.email,
					position: action.payload.loggedInUser.position,
					projectmanagers: [...action.payload.loggedInUser.projectmanagers],
					clients: [...action.payload.loggedInUser.clients],
					projects: [...action.payload.loggedInUser.projects],
					tickets: [...action.payload.loggedInUser.tickets]
				},
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
