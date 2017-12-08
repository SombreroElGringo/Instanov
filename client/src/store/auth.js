// CONST
export const HANDLE_AUTH = "HANDLE_AUTH";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

// ACTION
export const handle_auth = (auth) => {
	return {
		type: HANDLE_AUTH,
		payload: auth
	}
};

export const logout = (dispatch) => {
	console.log(dispatch);
	fetch("http://localhost:5000/logout", {
		credentials: "include"
	})
		.then(res => res.json())
		.then(json => {
			if (json.code !== 200)
				throw new Error('Logout failed');
			else
				dispatch({
					type: LOGOUT_SUCCESS
				})
		})
		.catch(err => {
			dispatch({
				type: LOGOUT_FAIL,
				payload: err
			})
		});
	return {
		type: LOGOUT,
	}
};

// STATE
const bindActionType = {
	[HANDLE_AUTH]: (state, {payload}) => ({...state, isAuth: payload}),
	[LOGOUT_SUCCESS]: (state, {payload}) => ({...state, isAuth: false})
};

const initialState = {
	isAuth: false,
};

export default (state = initialState, action) => {
	console.log(action);
	if (bindActionType[action.type])
		return bindActionType[action.type](state, action);
	return {...state}
}