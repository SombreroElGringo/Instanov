import React from "react";
import {Bubble} from './'

export default class News extends React.Component {
	render() {
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
				{[
					{name: 'Vous', image: 'https://unsplash.it/64?random'},
					{name: 'Toto', image: 'https://unsplash.it/64?random'},
					{name: 'Truc', image: 'https://unsplash.it/64?random'},
					{name: 'Sexy_potato', image: 'https://unsplash.it/64?random'},
					{name: 'Chips_co', image: 'https://unsplash.it/64?random'},
					{name: 'InstaDraw', image: 'https://unsplash.it/64?random'},
					{name: 'AbraPowa', image: 'https://unsplash.it/64?random'},
				].map((value, index) => {
					return <Bubble name={value.name}
					               animation={'flipInY'}
					               delay={index + 1}
					               image={value.image + '&' + index}
					               key={index}/>
				})}
			
			</div>
		</div>
	}
}