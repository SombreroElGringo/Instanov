import fetch from 'cross-fetch';
import {FETCH_POST, FETCH_POST_FAIL, FETCH_POST_SUCCESS, FETCH_USER_POSTS, FETCH_USER_POSTS_FAIL, FETCH_USER_POSTS_SUCCESS} from "./consts";
import {API_URL} from "../../utils/env";


export const fetchPosts = () => {
	return async (dispatch) => {
		dispatch({type: FETCH_POST});
		
		const fetch_url = API_URL+"/";
		const fetch_options = {credentials: "include"};
		
		try{
			const response = await fetch(fetch_url, fetch_options);
			const json = await response.json();
			if(!json.stories)
				throw new Error('no stories');
			dispatch({type: FETCH_POST_SUCCESS, payload: json.stories});
			return json;
		}catch(err){
			dispatch({type: FETCH_POST_FAIL, err})
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
			const json = await response.json();
			if (!json.stories)
				throw new Error('no stories');
			dispatch({type: FETCH_USER_POSTS_SUCCESS, payload: json.stories});
		} catch (err) {
			dispatch({type: FETCH_USER_POSTS_FAIL, err})
		}
	}
};