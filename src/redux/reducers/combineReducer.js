import reduceReducers from 'reduce-reducers';
import changeReducer from './changeReducer';
import authReducer from './authReducer';
import actionReducer from './actionReducer';

const initialState = {};

const rootReducer = reduceReducers(
	initialState,
	changeReducer,
	authReducer,
	actionReducer
);

export default rootReducer;
