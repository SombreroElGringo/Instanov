import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {checkUser, logout} from '../store/actions/auth'
import getIsAuth from "../store/selectors/get_is_auth";
import getUserInfo from "../store/selectors/get_user_info";

class Header extends React.Component {
	componentDidMount(){
		this.props.checkUser();
	}
	
	render() {
		const {isAuth, logout, user} = this.props;
		const {username} = user || {};
		
		return <header>
			<nav>
				<ul>
					<li><Link style={{color: 'black'}}
					          to={"/camera"}><i className={'fa fa-camera'}/></Link></li>
					<li className={'logo'}>Instanov</li>
					<li>
						{
							isAuth ? <i className={'fa fa-lock'}
							            onClick={logout}/> : <Link to={"/sign"}>
								<i className={'fa fa-send'}/>
							</Link>
						}
						{
							username && <Link to={`/profiles/${username}`}>
								<i className={'fa fa-user'}/>
							</Link>
						}
					</li>
				</ul>
			</nav>
		</header>
	}
}

export default connect(
	(state) => ({isAuth: getIsAuth(state), user: getUserInfo(state)}),
	(dispatch) => bindActionCreators({logout, checkUser}, dispatch)
)(Header);