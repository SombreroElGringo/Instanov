import React from 'react'

export default class Bubble extends React.Component {
	render() {
		const {image, name, recent = false, mini = false, delay = 0, animation = 'fadeIn'} = this.props;
		return <div className={'animated '+animation+' pt-1 pb-1 bubble ml-1 '+ (mini ? 'mini' : '')} style={{
			animationDelay: `${delay*100}ms`
		}}>
			<img className={'round image ' + (recent ? 'new' : '') + ' ' + (mini ? 'mini' : '')}
			     src={image}
			     alt=""/>
			{name && <div className={'text-center text mt-1'}>{name}</div>}
		</div>
	}
}