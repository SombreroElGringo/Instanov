import React, {Component} from "react";
import Bubble from "./bubble";
import moment from 'moment';
import 'moment/locale/fr'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {toggleLike} from "../store/actions/posts";
import getUserInfo from "../store/selectors/get_user_info";
import ReactPlaceholder from 'react-placeholder';

class Post extends Component {
	state = {ready: false};
	
	like() {
		const {post, toggleLike, user} = this.props;
		const {id} = post;
		toggleLike(id, user.username)
	}
	
	componentDidMount() {
		const img = document.createElement('img');
		img.src = this.props.post.featured;
		img.addEventListener("load", () => {
			this.setState({ready: true})
		})
	}
	
	render() {
		const {post, user} = this.props;
		const {username} = user || {};
		const {
			name,
			image,
			featured,
			description,
			date,
			likes,
		} = post || {};
		
		
		return <div className={'post animated fadeIn'}>
			<ReactPlaceholder type={"media"}
			                  ready={this.state.ready}
			                  rows={10}
			                  showLoadingAnimation={true}>
				<div className={'post-header d-flex justify-content-between align-items-center'}>
					<div className={'d-flex align-items-center'}>
						<Bubble image={image}
						        mini/>
						<div className={'post-name pl-1 link'}><Link to={`/profiles/${name}`}>{name}</Link></div>
					</div>
					<div className={'p-1'}>
						<i className={'fa fa-ellipsis-v'}/>
					</div>
				</div>
				<img src={featured}
				     className={'post-featured'}
				     alt=""/>
				<div className={'d-flex post-actions justify-content-between pt-1 pb-1'}>
					<div className={'d-flex'}>
						<i onClick={() => this.like()}
						   className={likes && likes.indexOf(username) > -1 ? 'fa fa-heart' : 'fa fa-heart-o'}/>
						<i className={'fa fa-comment-o'}/>
						<i className={'fa fa-paper-plane-o'}/>
					</div>
					<div className={'d-flex'}>
						<i className={'fa fa-bookmark-o'}/>
					</div>
				</div>
				{likes && likes.length > 0 && <div className={'p-1'}>
					Aimé par <b>{likes.slice(0, 2).join(', ')}</b>
					{likes.length > 2 && <span> et <b>{likes.length - 2} autre{likes.length > 3 && 's'} personne{likes.length > 3 && 's'}</b></span>}
				</div>}
				{description && <div className={'p-1'}>
					{description}
				</div>}
				<div className={'p-1 post-date'}>
					{moment(date).from(new Date())}
				</div>
			</ReactPlaceholder>
		</div>
	}
}

const mapStateToProps = (state) => ({
	user: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	toggleLike
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post)