import React, {Component} from "react";
import Bubble from "./bubble";
import moment from 'moment';
import 'moment/locale/fr'

export default class Post extends Component{
	render(){
		const {
			name,
			image,
			featured,
			description,
			date,
			likes,
		} = this.props.post;
		
		return <div className={'post'}>
			<div className={'post-header d-flex justify-content-between align-items-center'}>
				<div className={'d-flex align-items-center'}>
					<Bubble image={image} mini/>
					<div className={'post-name pl-1'}>{name}</div>
				</div>
				<div className={'p-1'}>
					<i className={'fa fa-ellipsis-v'}/>
				</div>
			</div>
			<img src={featured} className={'post-featured'} alt=""/>
			<div className={'d-flex post-actions justify-content-between pt-1 pb-1'} >
				<div className={'d-flex'}>
					<i className={'fa fa-heart-o'}/>
					<i className={'fa fa-comment-o'}/>
					<i className={'fa fa-paper-plane-o'}/>
				</div>
				<div className={'d-flex'}>
					<i className={'fa fa-bookmark-o'}/>
				</div>
			</div>
			{likes && <div className={'p-1'}>
				Aimé par <b>{likes.slice(0, 2).join(', ')}</b>
				{likes.length > 2 && <span> et <b>{likes.length - 2} autre{likes.length > 3 && 's'} personne{likes.length > 3 && 's'}</b></span>}
			</div>}
			{description && <div className={'p-1'}>
				{description}
			</div>}
			<div className={'p-1 post-date'}>
				Le {moment(date).format('LLLL')}
			</div>
		</div>
	}
}