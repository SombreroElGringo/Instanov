import {CHECK_USER, CHECK_USER_FAIL, CHECK_USER_SUCCESS, HANDLE_AUTH, LOGOUT, LOGOUT_FAIL, LOGOUT_SUCCESS} from "./consts";
import fetch from 'cross-fetch'
import {API_URL} from '../../utils/env'

export const handle_auth = (auth) => {
	return {
		type: HANDLE_AUTH,
		payload: auth
	}
};

export const checkUser = () => {
	return async (dispatch) => {
		dispatch({type: CHECK_USER});
		
		const temp_check_user_url = API_URL + '/profiles/demorite';
		const fetch_options = {credentials: "include"};
		
		try {
			const response = await fetch(temp_check_user_url, fetch_options);
			const json = await response.json();
			
			if (!json.user)
				throw new Error("user not found");
			
			dispatch({type: CHECK_USER_SUCCESS, payload: json.user});
			return json.user;
		} catch (err) {
			dispatch({type: CHECK_USER_FAIL, err})
		}
	}
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({type: LOGOUT});
		
		const logout_url = API_URL + "/logout";
		const fetch_options = {credentials: "include"};
		
		try {
			const response = await (await fetch(logout_url, fetch_options));
			const json = await response.json();
			
			if (json.code !== 200)
				throw new Error('Logout failed');

			dispatch({type: LOGOUT_SUCCESS})
		} catch (err) {
			dispatch({type: LOGOUT_FAIL, err})
		}
		
	}
};
