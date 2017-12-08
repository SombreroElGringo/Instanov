import {compose ,applyMiddleware, combineReducers, createStore,} from 'redux'
import auth from './auth'

export default createStore(combineReducers({
	auth
}))