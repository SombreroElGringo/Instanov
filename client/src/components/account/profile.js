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

class Profile extends Component {
	componentWillMount() {
		const {fetchUserPosts, fetchLikesFromUser} = this.props;
		const {username} = this.props.match.params;
		fetchUserPosts(username).catch(err => this.props.history.goBack());
		fetchLikesFromUser(username);
	}
	
	render() {
		const {user, posts, history, liked} = this.props;
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
										<div className="button">Modifier le profil</div>
									</div>
								</div>
								<div className="description">
									<div className="name">{name}</div>
									<div className="text">{description}</div>
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
}

const mapStateToProps = (state) => ({
	user: getUserPosts(state).user,
	posts: getUserPosts(state).stories,
	liked: getUserNumbersOfLikes(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserPosts, fetchLikesFromUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)