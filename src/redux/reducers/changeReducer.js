const initialState = {
	change: {}
};

const changeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HANDLE_CHANGE_EMAIL':
			const { email } = action.payload;

			return {
				...state,
				change: {
					...state.change,
					email: email
				}
			};
		case 'HANDLE_CHANGE_PASSWORD':
			const { password } = action.payload;

			return {
				...state,
				change: {
					...state.change,
					password: password
				}
			};
		case 'HANDLE_CHANGE_NAME':
			const { name } = action.payload;
			console.log(name);

			return {
				...state,
				change: {
					...state.change,
					name: name
				}
			};
		default:
			return state;
	}
};

export default changeReducer;
