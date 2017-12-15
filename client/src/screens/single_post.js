import React from 'react'
import getPost from "../store/selectors/get_post";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchPost} from "../store/actions/post";
import Loader from "../components/loaders/loader"
import Post from "../components/post";
import isLoading from "../store/selectors/get_is_loading";
import {fetchPosts} from "../store/actions/posts";

class SinglePost extends React.Component {
	componentDidMount() {
		const {fetchPost, fetchPosts} = this.props;
		fetchPost(this.props.match.params.id);
		fetchPosts();
	}
	
	render() {
		const {post, isLoading, history} = this.props;
		const {goBack} = history;
		
		return isLoading || !post
			? <Loader/>
			: <div className="App">
				<div>
					<div className="news-content">
						<div className="_profile">
							<header className="_h_profile">
								<div className={"link"}
								     onClick={goBack}>
									<i className={"fa fa-angle-left"}/> Back
								</div>
							</header>
						</div>
						<Post post={post}/>
					</div>
				</div>
			</div>
	}
}

const mapStateToProps = (state) => ({
	post: getPost(state),
	isLoading: isLoading(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchPost, fetchPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);