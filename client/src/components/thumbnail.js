import React, {Component} from "react";

export default class Thumbnail extends Component{
	render(){
		const {
			featured,
		} = this.props.post;

		return (
            <div className={'thumbnail animated fadeIn'}>
                <img src={featured} className={'thumbnail-featured'} alt=""/>  
            </div>
        )
	}
}