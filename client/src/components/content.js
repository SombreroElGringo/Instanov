import React from 'react'
import {Post} from './'
import moment from 'moment'

export default class Content extends React.Component {
	state = {
		posts: null
	};
	
	async fetchPosts() {
		const url = process.env.REACT_APP_API_URL + '/api/v1/';
		console.log(url);
		try {
			const res = await fetch(url);
			const json = await res.json();
			this.setState({
				posts: json.stories,
			});
		} catch (e) {
			this.setState({
				posts: [],
			});
		}
	}
	
	componentDidMount() {
		this.fetchPosts().catch(e => console.log(e));
	}
	
	render() {
		if (this.state.posts){
			if(this.state.posts.length < 1){
				return <h3 className={'text-center'}>Aucun contenu</h3>
			}
			return null;
		}
		
		return <div className={'news-content'}>
			{this.state.posts && this.state.posts.map(post => {
				return <Post post={post} key={post.id}/>
			})}
			<Post post={{
				name: 'truc',
				image: 'https://unsplash.it/32',
				featured: 'https://unsplash.it/600',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509623326 * 1000),
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
				date: moment(1509621326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&3',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
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
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&5',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&6',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&7',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&8',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&9',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&10',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&11',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
			<Post post={{
				name: 'hello',
				image: 'https://unsplash.it/32?random&3',
				featured: 'https://unsplash.it/600?random&12',
				description: 'SOME DESCRIPTION GOES HERE',
				date: moment(1509620326 * 1000),
				likes: [
					'Plop',
					'Plopy',
					'Machin'
				]
			}}/>
		</div>
	}
}