import {FETCH_POST, FETCH_POST_FAIL, FETCH_POST_SUCCESS} from './consts';
import {API_URL} from "../../utils/env";


export const fetchPost = (id) => {
	return async (dispatch) => {
		dispatch({type: FETCH_POST});
		
		try{
			const response = await fetch(`${API_URL}/story/${id}`);
			if(!response.ok) throw new Error("An error occured");
			const json = await response.json();
			dispatch({
				type: FETCH_POST_SUCCESS,
				payload: json
			})
		}catch(err){
			dispatch({
				type: FETCH_POST_FAIL,
				err
			})
		}
		
	}
};