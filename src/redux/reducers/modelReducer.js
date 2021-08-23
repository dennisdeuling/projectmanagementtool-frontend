const modelReducer = (state, action) => {
	const modelLower = `${action.modelLower}s`;

	switch (action.type) {
		case `FETCH_${action.modelUpper}_REQUEST`:
			return {
				...state,
				loading: true,
				error: null
			};
		case `FETCH_${action.modelUpper}_SUCCESS`:
			return {
				...state,
				[modelLower]: [...action.payload.newData],
				loading: false,
				error: null
			};
		case `FETCH_${action.modelUpper}_ERROR`:
			return {
				...state,
				[modelLower]: {},
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
};

export default modelReducer;
