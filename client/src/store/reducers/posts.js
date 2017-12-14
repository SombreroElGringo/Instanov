import {Map} from 'immutable'
import {FETCH_POSTS_SUCCESS, FETCH_USER_POSTS_SUCCESS, LIKE_POST_SUCCESS} from "../actions/consts";

const initialState = Map({
	posts: [],
	user_posts: [],
});

const handlers = {
	[FETCH_POSTS_SUCCESS]: (state, action) => state.set('posts', action.payload),
	[FETCH_USER_POSTS_SUCCESS]: (state, action) => state.set('user_posts', action.payload),
	[LIKE_POST_SUCCESS]: (state, action) => state.update("posts", (posts) => {
		const {id, username} = action.payload;
		posts = posts.map(post => {
			if(post._id === id){
				if (post.likes.indexOf(username) >= 0)
					post.likes = post.likes.slice(post.likes.indexOf(username), -1);
				else
					post.likes.push(username);
			}
			return post;
		});
		
		return posts
	})
};

export default (state = initialState, action) => {
	if (typeof handlers[action.type] === "function")
		return handlers[action.type](state, action);
	return state;
}