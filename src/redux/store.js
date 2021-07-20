import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import rootRedrucer from './reducers/combineReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(logger, thunkMiddleware));

const store = createStore(rootRedrucer, composedEnhancer);

store.subscribe(() => {
	console.log(store.getState());
});

export default store;
