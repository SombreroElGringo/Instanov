import moment from "moment";

const getPost = (state) => {
	const post = state.posts.get('posts').find(post => post._id === state.currentpost.get('post'));
	return !post ? null : {
		id: post._id,
		name: post.username,
		image: "https://unsplash.it/32",
		featured: post.info.path,
		description: post.info.description,
		date: moment(post.createdAt),
		likes: post.likes
	}
};
export default getPost;