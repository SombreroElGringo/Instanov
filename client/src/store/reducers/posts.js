import {Map} from 'immutable'
import {FETCH_POST_SUCCESS, FETCH_USER_POSTS_SUCCESS} from "../actions/consts";

const initialState = Map({
	posts: [],
	user_posts: [],
});

const handlers = {
	[FETCH_POST_SUCCESS] : (state, action) => state.set('posts', action.payload),
	[FETCH_USER_POSTS_SUCCESS] : (state, action) => state.set('user_posts', action.payload)
};

export default (state = initialState, action) => {
	if(typeof handlers[action.type] === "function")
		return handlers[action.type](state, action);
	return state;
}