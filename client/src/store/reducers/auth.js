import {CHECK_USER_FAIL, CHECK_USER_SUCCESS, HANDLE_AUTH, LOGOUT} from "../actions/consts";
import {Map} from 'immutable'

const initialState = Map({
	isAuth: undefined,
	user: null
});

const handlers = {
	[HANDLE_AUTH]: (state, {payload}) => state.set('isAuth', payload),
	[LOGOUT]: (state, {payload}) => state.set('isAuth', false),
	[CHECK_USER_SUCCESS]: (state, {payload}) => state.set('user', payload).set('isAuth', true),
	[CHECK_USER_FAIL]: (state, {payload}) => state.set('isAuth', false)
};

export default (state = initialState, action) => {
	if (handlers[action.type])
		return handlers[action.type](state, action);
	return state
}