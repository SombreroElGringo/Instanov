import React from 'react'
import {Post} from './'
import moment from 'moment'

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

export default class Content extends React.Component {
	state = {
		posts: null
	};
	
	async fetchPosts() {
		const url = API_URL + '/';
		console.log(url);
		try {
			const res = await fetch(url, {
				credentials: 'include',
			});
			const json = await res.json();
			console.log(json.stories)
			this.setState({
				posts: json.stories,
			});
		} catch (e) {
			this.setState({
				posts: [],
			});
		}
	}
	
	componentDidMount() {
		this.fetchPosts().catch(e => console.log(e));
	}
	
	render() {
		if (!this.state.posts)
			return null;
		
		if (this.state.posts.length < 1)
			return <h3 className={'text-center'}>Aucun contenu</h3>;
		
		return <div className={'news-content'}>
			{this.state.posts && this.state.posts.map(post => {
				const newPost = {
					name: post.username,
					image: "https://unsplash.it/32",
					featured: post.info.path,
					description: post.info.description,
					date: moment(post.updatedAt),
					likes: post.likes
				}
				
				console.log(newPost)
				
				return <Post post={newPost} key={post._id}/>
			})}
		</div>
	}
}