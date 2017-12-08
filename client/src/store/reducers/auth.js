import {CHECK_USER_SUCCESS, HANDLE_AUTH, LOGOUT_SUCCESS} from "../actions/consts";
import {Map} from 'immutable'

const initialState = Map({
	isAuth: false,
	user: null
});

const handlers = {
	[HANDLE_AUTH]: (state, {payload}) => state.set('isAuth', payload),
	[LOGOUT_SUCCESS]: (state, {payload}) => state.set('isAuth', false),
	[CHECK_USER_SUCCESS]: (state, {payload}) => state.set('user', payload)
};

export default (state = initialState, action) => {
	if (handlers[action.type])
		return handlers[action.type](state, action);
	return state
}