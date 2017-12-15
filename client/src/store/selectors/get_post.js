import moment from "moment";
import {createSelector} from 'reselect'
import getPosts from "./get_posts";
import getCurrentPost from "./get_current_post";

const getPost = createSelector([getPosts, getCurrentPost], (posts, currentpost) => {
	if(!posts) return null;
	const post = posts.find(post => post._id === currentpost);
	return !post ? null : {
		id: post._id,
		name: post.username,
		image: "https://unsplash.it/32",
		featured: post.info.path,
		description: post.info.description,
		date: moment(post.createdAt),
		likes: post.likes
	}
});
export default getPost;