import fetch from 'cross-fetch';
import {
	FETCH_LIKES_FROM_USER,
	FETCH_LIKES_FROM_USER_FAIL,
	FETCH_LIKES_FROM_USER_SUCCESS,
	FETCH_POSTS,
	FETCH_POSTS_FAIL,
	FETCH_POSTS_SUCCESS,
	FETCH_USER_POSTS,
	FETCH_USER_POSTS_FAIL,
	FETCH_USER_POSTS_SUCCESS, FETCH_USERS, FETCH_USERS_FAIL, FETCH_USERS_SUCCESS,
	LIKE_POST,
	LIKE_POST_FAIL,
	LIKE_POST_SUCCESS
} from "./consts";
import {API_URL} from "../../utils/env";


export const fetchPosts = () => {
	return async (dispatch) => {
		dispatch({type: FETCH_POSTS});
		dispatch({type: FETCH_USERS});
		
		const fetch_url = API_URL + "/";
		const fetch_options = {credentials: "include"};
		
		try {
			const response = await fetch(fetch_url, fetch_options);
			const json = await response.json();
			if (!json.stories)
				throw new Error('no stories');
			dispatch({type: FETCH_POSTS_SUCCESS, payload: json.stories});
			dispatch({type: FETCH_USERS_SUCCESS, payload: json.users});
			return json;
		} catch (err) {
			dispatch({type: FETCH_POSTS_FAIL, err})
			dispatch({type: FETCH_USERS_FAIL, err})
		}
	}
};

export const fetchUserPosts = (username) => {
	return async (dispatch) => {
		dispatch({type: FETCH_USER_POSTS});
		
		const fetch_url = API_URL + "/profiles/" + username;
		const fetch_options = {credentials: "include"};
		
		try {
			const response = await fetch(fetch_url, fetch_options);
			if (!response.ok) throw new Error('user not found');
			const json = await response.json();
			if (!json.stories) throw new Error('no stories');
			dispatch({type: FETCH_USER_POSTS_SUCCESS, payload: json});
		} catch (err) {
			dispatch({type: FETCH_USER_POSTS_FAIL, err});
			throw err;
		}
	}
};

export const toggleLike = (id, username) => {
	return async (dispatch) => {
		dispatch({type: LIKE_POST, payload: {id, username}});
		try {
			const url = `${API_URL}/story/${id}/like/${username}`;
			const options = {credentials: "include", method: "post"};
			const response = await fetch(url, options);
			if (!response.ok) throw new Error("Cannot like");
			dispatch({
				type: LIKE_POST_SUCCESS, payload: {
					id, username
				}
			})
		} catch (err) {
			dispatch({type: LIKE_POST_FAIL, err})
		}
	}
};

export const fetchLikesFromUser = (username) => {
	return async (dispatch) => {
		dispatch({type: FETCH_LIKES_FROM_USER});
		try {
			const url = `${API_URL}/story/liked/${username}`;
			const options = {credentials: "include"};
			const response = await fetch(url, options);
			if (!response.ok) throw new Error(`Cannot fetch likes for ${username}`);
			const json = await response.json();
			dispatch({type: FETCH_LIKES_FROM_USER_SUCCESS, payload: json.stories})
		} catch (err) {
			dispatch({type: FETCH_LIKES_FROM_USER_FAIL, err})
		}
	}
};