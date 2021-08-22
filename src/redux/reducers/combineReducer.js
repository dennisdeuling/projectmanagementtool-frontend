import reduceReducers from 'reduce-reducers';
import changeReducer from './changeReducer';
import authReducer from './authReducer';
import actionReducer from './actionReducer';
import userReducer from './userReducer';
import modelReducer from './modelReducer';

const initialState = {
	change: {}
};

const rootReducer = reduceReducers(
	initialState,
	changeReducer,
	authReducer,
	actionReducer,
	userReducer,
	modelReducer
);

export default rootReducer;
