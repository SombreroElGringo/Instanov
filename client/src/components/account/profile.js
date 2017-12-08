import React, {Component} from 'react';
import Thumbnail from '../thumbnail';

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

export default class Profile extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			user: {
				_id: null,
				username: null,
				name: null,
				description: null,
			},
			posts: null,
		};
	}
	
	async fetchPosts() {
		const username = "demorite";
		console.log(this);
		const url = `${API_URL}/profiles/${username}`;
		console.log(url);
		try {
			const res = await fetch(url, {
				credentials: 'include',
			});
			const json = await res.json();
			console.log(json.stories);
			this.setState({
				user: {
					_id: json.user._id,
					username: json.user.username,
					name: json.user.name,
					description: json.user.description,
				},
				posts: json.stories,
			});
		} catch (e) {
			this.setState({
				user: {},
				posts: [],
			});
		}
	}
	
	componentDidMount() {
		this.fetchPosts().catch(e => console.log(e));
	}
	
	render() {
		
		const {user, posts} = this.state;
		return user ? <img src={"https://http.cat/403"}
		                   style={{width: "100%"}}/> : (
			<div>
				<section className={'fs-fafafa'}>
					<div>
						<article className="_profile">
							<header className="_h_profile">
								<div className="_h_thumbnail">
									<img className={'avatar round'}
									     src="https://unsplash.it/152"
									     alt="avatar"/>
								</div>
								<div className="_h_info">
									<h1 className="_h_t">{user.username}</h1>
									<h2 className="_h_st">{user.name}</h2>
									{user.description ? <div className="_h_d">{user.description}</div> : null}
								
								</div>
							</header>
							<div>
								{!posts ? null
									:
									posts.lenght < 1 ? (<h3 className={'text-center'}>Aucun contenu</h3>) : (
										
										<div className={'_usr_stories'}>
											{this.state.posts && this.state.posts.map(post => {
												const newThumbnail = {
													featured: post.info.path,
												};
												
												return <Thumbnail post={newThumbnail}
												                  key={post._id}/>
											})}
										</div>
									)
								}
							
							</div>
						</article>
					</div>
				</section>
			</div>
		);
	}
}