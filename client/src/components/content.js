import React from 'react'
import {Post} from './'

export default class Content extends React.Component {
	render() {
		return <div className={'news-content'}>
			<Post post={{
				name: 'truc',
				image: 'https://unsplash.it/32',
				featured: 'https://unsplash.it/600',
				description: 'SOME DESCRIPTION GOES HERE',
				date: new Date(),
				likes: [
					'Plop',
					'Plopy',
					'Plopy2',
					'Plopy3',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'bidule',
				image: 'https://unsplash.it/32?random&1',
				featured: 'https://unsplash.it/600?random&2',
				description: 'SOME DESCRIPTION GOES HERE',
				date: new Date(),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&4',
				description: 'SOME DESCRIPTION GOES HERE',
				date: new Date(),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
		</div>
	}
}