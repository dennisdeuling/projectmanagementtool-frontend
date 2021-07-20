import { combineReducers } from 'redux';
import changeReducer from './changeReducer';
import authReducer from './authReducer';

const rootRedrucer = combineReducers({
	changeReducer: changeReducer,
	authReducer: authReducer
});

export default rootRedrucer;
