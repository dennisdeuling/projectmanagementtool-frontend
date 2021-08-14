const initialState = {};

const modelReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case `FETCH_${action.modelUpper}_REQUEST`:
			return {
				...state,
				loading: true,
				error: null
			};
		case `FETCH_${action.modelUpper}_SUCCESS`:
			console.log(action);
			return {
				...state,
				[action.modelLower]: [...action.payload.newData],
				loading: false,
				error: null
			};
		case `FETCH_${action.modelUpper}_ERROR`:
			return {
				...state,
				[action.modelLower]: {},
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
};

export default modelReducer;
