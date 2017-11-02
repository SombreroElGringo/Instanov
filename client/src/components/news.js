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
				<Bubble name={'Vous'} image={'https://unsplash.it/64?random'}/>
				<Bubble recent name={'Toto'} image={'https://unsplash.it/64?random&1'}/>
				<Bubble recent name={'Truc'} image={'https://unsplash.it/64?random&2'}/>
				<Bubble recent  name={'Sexy_potato'} image={'https://unsplash.it/64?random&3'}/>
				<Bubble name={'Chips_co.'} image={'https://unsplash.it/64?random&4'}/>
				<Bubble name={'InstaDraw'} image={'https://unsplash.it/64?random&5'}/>
				<Bubble name={'AbraPowa'} image={'https://unsplash.it/64?random&6'}/>
			</div>
		</div>
	}
}