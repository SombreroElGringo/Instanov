import React from 'react'

export default class Bubble extends React.Component {
	render() {
		const {image, name, recent = false, mini = false} = this.props;
		return <div className={'pt-1 pb-1 bubble ml-1 '+ (mini ? 'mini' : '')}>
			<img className={'round image ' + (recent ? 'new' : '') + ' ' + (mini ? 'mini' : '')}
			     src={image}
			     alt=""/>
			{name && <div className={'text-center text mt-1'}>{name}</div>}
		</div>
	}
}