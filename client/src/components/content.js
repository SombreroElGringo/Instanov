import React from 'react'
import {Post} from './'
import moment from 'moment'
import getPosts from "../store/selectors/get_posts";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchPosts} from "../store/actions/posts";
import Loader from './loaders/loader'


class Content extends React.Component {
	
	componentDidMount() {
		const {fetchPosts} = this.props;
		fetchPosts();
	}
	
	render() {
		const {posts} = this.props;
		
		if (!posts)
			return <Loader/>;
		
		if (posts.length < 1)
			return <h3 className={'text-center'}>Aucun contenu</h3>;
		
		return <div className={'news-content'}>
			{posts && posts.map(post => {
				const newPost = {
					id: post._id,
					name: post.username,
					image: "https://unsplash.it/32",
					featured: post.info.path,
					description: post.info.description,
					date: moment(post.createdAt),
					likes: post.likes
				};
				return <Post post={newPost}
				             key={post._id}/>
			})}
		</div>
	}
}

const mapStateToProps = state => ({posts: getPosts(state)});
const mapDispatchToProps = dispatch => bindActionCreators({fetchPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Content);