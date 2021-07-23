const initialState = {
	change: {}
};

const changeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HANDLE_CHANGE_EMAIL':
			const { email } = action.payload;

			return {
				change: {
					...state.change,
					email: email
				}
			};
		case 'HANDLE_CHANGE_PASSWORD':
			const { password } = action.payload;

			return {
				change: {
					...state.change,
					password: password
				}
			};
		default:
			return state;
	}
};

export default changeReducer;
