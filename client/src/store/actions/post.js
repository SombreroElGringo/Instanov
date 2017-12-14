import {FETCH_POST, FETCH_POST_FAIL, FETCH_POST_SUCCESS} from './consts';
import {API_URL} from "../../utils/env";


export const fetchPost = (id) => {
	return async (dispatch) => {
		dispatch({type: FETCH_POST});
		
		try{
			const url = `${API_URL}/story/${id}`;
			const options = {credentials: "include"};
			
			const response = await fetch(url, options);
			if(!response.ok) throw new Error("An error occured");
			const story = (await response.json()).story;
			const payload = story._id;
			
			dispatch({
				type: FETCH_POST_SUCCESS,
				payload
			})
		}catch(err){
			dispatch({
				type: FETCH_POST_FAIL,
				err
			})
		}
		
	}
};