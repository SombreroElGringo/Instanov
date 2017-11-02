import React from 'react'

export default class Header extends React.Component{
	render(){
		return <header>
			<nav>
				<ul>
					<li><i className={'fa fa-camera'} /></li>
					<li className={'logo'}>Instanov</li>
					<li><i className={'fa fa-send'} /></li>
				</ul>
			</nav>
		</header>
	}
}