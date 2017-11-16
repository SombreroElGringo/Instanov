import React from 'react'
import {Link} from "react-router-dom";

export default class Header extends React.Component{
	render(){
		return <header>
			<nav>
				<ul>
					<li><Link style={{color: 'black'}} to={"/camera"}><i className={'fa fa-camera'}/></Link></li>
					<li className={'logo'}>Instanov</li>
					<li><i className={'fa fa-send'} /></li>
				</ul>
			</nav>
		</header>
	}
}