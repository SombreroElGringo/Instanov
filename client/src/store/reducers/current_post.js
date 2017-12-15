import {Map} from 'immutable'
import {FETCH_POST, FETCH_POST_FAIL, FETCH_POST_SUCCESS} from "../actions/consts";

const initialState = Map({
	post: null,
	isLoading: undefined,
});

const handlers = {
	[FETCH_POST]: (state, action) => state.set("isLoading", true),
	[FETCH_POST_SUCCESS]: (state, action) => state.set("isLoading", false).set("post", action.payload),
	[FETCH_POST_FAIL]: (state, action) => state.set("isLoading", false),
};

export default (state = initialState, action) => {
	if (typeof handlers[action.type] === "function")
		return handlers[action.type](state, action);
	return state;
}