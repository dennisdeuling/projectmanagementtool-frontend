const actionReducer = (state, action) => {
	const { model } = action.payload ? action.payload : '';

	switch (action.type) {
		case 'ADD_REQUEST':
			return {
				...state,
				error: null
			};
		case 'ADD_SUCCESS':
			return {
				...state,
				[`${model}s`]: [...action.payload.newData],
				error: null
			};
		case 'ADD_ERROR':
			return {
				...state,
				error: action.payload.error
			};
		case 'EDIT_REQUEST':
			return {
				...state,
				error: null
			};
		case 'EDIT_SUCCESS':
			return {
				...state,
				change: action.payload.newData,
				error: null
			};
		case 'EDIT_ERROR':
			return {
				...state,
				error: action.payload.error
			};
		case 'DELETE_REQUEST':
			return {
				...state,
				error: null
			};
		case 'DELETE_SUCCESS':
			switch (action.model) {
				case 'projectmanager':
					return {
						...state,
						projectmanagers: [...action.payload.newData],
						error: null
					};
				case 'client':
					return {
						...state,
						clients: [...action.payload.newData],
						error: null
					};
				case 'project':
					return {
						...state,
						projects: [...action.payload.newData],
						error: null
					};
				case 'ticket':
					return {
						...state,
						tickets: [...action.payload.newData],
						error: null
					};
				default:
					break;
			}
			break;
		case 'DELETE_ERROR':
			return {
				...state,
				error: action.payload.error
			};
		default:
			return state;
	}
};
export default actionReducer;
