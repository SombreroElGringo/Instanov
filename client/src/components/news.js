import React from "react";
import {Bubble} from './'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import getUsers from "../store/selectors/get_users";
import {Link} from "react-router-dom";

class News extends React.Component {
	render() {
		const {users} = this.props;
		
		return <div className={'bubble_container'}>
			<div className={'p-1 d-flex justify-content-between'}>
				<b>
					<div>Actualités</div>
				</b>
				<b>
					<div>
						<i className={'fa fa-caret-right'}/>
						<span> Tout regarder</span>
					</div>
				</b>
			</div>
			<div className={'d-flex over-hidden'}>
				{users && users.map((value, index) => {
					if (!value.profile) return null;
					value = value.profile;
					value.image = value.image || "https://unsplash.it/60/60?random&" + index;
					return <Link to={`/profiles/${value.username}`}
					             key={index}>
						<Bubble name={value.username}
						        animation={'flipInY'}
						        delay={index + 1}
						        image={value.image + '&' + index}
						/>
					</Link>
				})}
			
			</div>
		</div>
	}
}

const mapStateToProps = (state) => ({
	users: getUsers(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(News);