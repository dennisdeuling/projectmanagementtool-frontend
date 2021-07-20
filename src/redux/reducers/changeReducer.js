const initialState = {
	change: {}
};

const changeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HANDLE_CHANGE':
			const { email, password } = action.payload;

			return {
				...state,
				change: {
					email: email ? email : state.change.email,
					password: password ? password : state.change.password
				}
			};
		default:
			return state;
	}
};

export default changeReducer;
