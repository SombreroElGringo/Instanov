import React, {Component} from 'react';
import Thumbnail from '../thumbnail';
import {connect} from "react-redux";
import getUserInfo from "../../store/selectors/get_user_info";
import getUserPosts from "../../store/selectors/get_user_posts";
import {bindActionCreators} from "redux";
import {fetchUserPosts} from "../../store/actions/posts";
import {checkUser} from "../../store/actions/auth";
import Loader from "../loader";

class Profile extends Component {
	componentDidMount() {
		const {user, checkUser, fetchUserPosts} = this.props;
		if(!user) checkUser().then(user => fetchUserPosts(user.username));
		if(user) fetchUserPosts(user.username)
	}
	
	render() {
		
		const {user, posts} = this.props;
		
		return !user ? <Loader/> : (
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
											{posts && posts.map(post => {
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

const mapStateToProps = (state) => ({user: getUserInfo(state), posts: getUserPosts(state)});
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserPosts, checkUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)