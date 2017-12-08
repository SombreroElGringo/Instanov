import React from 'react'
import {Post} from './'
import moment from 'moment'
import Spinner from 'react-spinkit'

const Loader = () => <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
	<Spinner name={"three-bounce"} noFadeIn={true}/>
</div>;

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

export default class Content extends React.Component {
	state = {
		posts: null
	};
	
	async fetchPosts() {
		const url = API_URL + '/';
		try {
			const res = await fetch(url, {
				credentials: 'include',
			});
			const json = await res.json();
			setTimeout(() => {
				this.setState({
					posts: json.stories,
				});
			}, 3000)
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
			return <Loader />;
		
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
				};
				return <Post post={newPost}
				             key={post._id}/>
			})}
		</div>
	}
}