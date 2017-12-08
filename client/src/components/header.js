import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from '../store/actions/auth'
import getIsAuth from "../store/selectors/get_is_auth";

class Header extends React.Component {
	render() {
		const {isAuth, logout} = this.props;
		
		
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
					</li>
				</ul>
			</nav>
		</header>
	}
}

export default connect(
	(state) => ({isAuth: getIsAuth(state)}),
	(dispatch) => bindActionCreators({logout}, dispatch)
)(Header);