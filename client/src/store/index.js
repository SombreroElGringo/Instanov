import {applyMiddleware, combineReducers, createStore,} from 'redux'
import auth from './reducers/auth'
import posts from './reducers/posts'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middlewares/logger'

const middlewares = [
	thunkMiddleware,
	loggerMiddleware
];

export default createStore(combineReducers({
	auth,
	posts
}), applyMiddleware(...middlewares))