import React, {Component} from 'react';
import {connect} from "react-redux";
import getUserPosts from "../../store/selectors/get_user_posts";
import {bindActionCreators} from "redux";
import {fetchUserPosts} from "../../store/actions/posts";
import Loader from "../loader";
import {Link} from "react-router-dom";

class Profile extends Component {
	componentWillMount() {
		const {fetchUserPosts} = this.props;
		const {username} = this.props.match.params;
		fetchUserPosts(username).catch(err => this.props.history.goBack());
	}
	
	render() {
		const {user, posts, history} = this.props;
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
												<div>26</div>
												<div>publi.</div>
											</div>
											<div className="subs">
												<div>13</div>
												<div>abonnés</div>
											</div>
											<div className="mySubs">
												<div>101</div>
												<div>abos</div>
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
	posts: getUserPosts(state).stories
});
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile)