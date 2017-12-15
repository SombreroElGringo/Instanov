import React, {Component} from 'react';
import {connect} from "react-redux";
import getUserPosts from "../../store/selectors/get_user_posts";
import getUserNumbersOfLikes from "../../store/selectors/get_user_numbers_of_likes";
import {bindActionCreators} from "redux";
import {fetchLikesFromUser, fetchUserPosts} from "../../store/actions/posts";
import CircleSpinner from '../loaders/circle_spinner';
import Loader from "../loaders/loader";
import {Link} from "react-router-dom";
import * as _ from "lodash";
import getUserInfo from "../../store/selectors/get_user_info";
import fetch from 'cross-fetch';
import {API_URL} from "../../utils/env";

class Profile extends Component {
	state = {edition: true};
	
	componentWillMount() {
		const {fetchUserPosts, fetchLikesFromUser} = this.props;
		const {username} = this.props.match.params;
		fetchUserPosts(username).catch(err => this.props.history.goBack());
		fetchLikesFromUser(username);
	}
	
	render() {
		const {edition} = this.state;
		const {user, posts, history, liked, current_user} = this.props;
		const {goBack} = history;
		const {profile, username, name, description} = user || {};
		const {picture} = profile || {};
		
		return !user ? <Loader/> : (
			<div>
				<section className={'fs-fafafa'}>
					<div className="_profile">
						<header className="_h_profile">
							<div className="status_bar">
								<div className="username link"
								     onClick={goBack}>
									<i className={"fa fa-angle-left"}/> {username}
								</div>
								<div className="actions">
									<i className="fa fa-undo"/>
									<i className="fa fa-user"/>
									<i className="fa fa-ellipsis-v"/>
								</div>
							</div>
							<div className="infos">
								<div className="thumb_and_stats">
									<div className="thumbnail"
									     style={{backgroundImage: `url(${picture || "https://unsplash.it/300"})`}}/>
									<div className="stats_and_button">
										<div className="stats">
											<div className="posts">
												<div>{posts.length}</div>
												<div>publi.</div>
											</div>
											<div className="subs">
												<div>{_.sum(posts.map(post => post.likes.length))}</div>
												<div>likes</div>
											</div>
											<div className="mySubs">
												<div>{liked === undefined
													? <CircleSpinner/>
													: !liked
														? 0
														: liked.length}</div>
												<div>liked stories</div>
											</div>
										</div>
										{
											current_user
											&& current_user.username === username
											&& <div className="button"
											        onClick={() => this.toggleEdition()}>Modifier le profil</div>
										}
									</div>
								</div>
								<div className="description">
									<div className="name">{name}</div>
									<div className="text">
										{
											!edition
												? description
												: <div className={"editor"}>
													<textarea defaultValue={description}
													          ref={ref => this.description = ref}/>
													<div className="accept"
													     onClick={() => this.handleSubmition()}>
														<i className={"fa fa-check link"}/>
													</div>
													<div className="cancel"
													     onClick={() => {
														     this.toggleEdition();
														     this.resetValue()
													     }}>
														<i className={"fa fa-times link"}/>
													</div>
												</div>
											
										}
									</div>
								</div>
							</div>
							<div className="filter_icons">
								<div><i className={"fa fa-th"}/></div>
								<div><i className={"fa fa-list"}/></div>
								<div><i className={"fa fa-user-circle-o"}/></div>
								<div><i className={"fa fa-bookmark-o"}/></div>
							</div>
						</header>
						<div className="_usr_stories">
							{
								!posts || posts.lenght < 1
									? <div className={"no_content"}>No Content</div>
									: <div className={'stories'}>
										{posts && posts.map(post => {
											const newThumbnail = {
												featured: post.info.path,
											};
											
											return <div className={"thumbnail"}
											            style={{backgroundImage: `url(${newThumbnail.featured})`}}
											            key={post._id}>
												<Link to={`/posts/${post._id}`}>
													<div className={"thumb_info"}>
														
														<div className="likes">
															<i className={"fa fa-heart"}/>
															<div className="number">
																{post.likes.length}
															</div>
														</div>
													</div>
												</Link>
											
											</div>
										})}
									</div>
							}
						</div>
					</div>
				</section>
			</div>
		);
	}
	
	toggleEdition() {
		const {edition} = this.state;
		this.setState({edition: !edition})
	}
	
	resetValue() {
		this.description.value = "";
	}
	
	async handleSubmition() {
		try{
			
			const url = `${API_URL}/accounts/profile`;
			const options = {credentials: "include", method: "POST", data: {description: this.description.value}};
			const response = await fetch(url, options);
			if (!response.ok)
				throw new Error(`cannot change description fror ${this.props.current_user.username}`)
			console.log(await response.json())
		}catch(err){
			console.error(err);
		}
	}
}

const mapStateToProps = (state) => ({
	user: getUserPosts(state).user,
	posts: getUserPosts(state).stories,
	liked: getUserNumbersOfLikes(state),
	current_user: getUserInfo(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserPosts, fetchLikesFromUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)