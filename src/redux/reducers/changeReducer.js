const changeReducer = (state, action) => {
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
			case 'SET_CHANGE_DATA':
				return {
					...state,
					change: action.payload.change
				};
		default:
			return state;
	}
};

export default changeReducer;
