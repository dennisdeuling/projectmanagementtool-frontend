const initialState = {
	change: {}
};

const changeReducer = (state = initialState, action) => {
	const { eventName } = action.payload ? action.payload : '';

	switch (action.type) {
		case `HANDLE_CHANGE_${eventName}`:
			const key = action.payload.eventName.toLowerCase();
			return {
				...state,
				change: {
					...state.change,
					[key]: action.payload[key]
				}
			};
		default:
			return state;
	}
};

export default changeReducer;
