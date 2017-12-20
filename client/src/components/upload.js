import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import CircleSpinner from "./loaders/circle_spinner";
import {API_URL} from "../utils/env";


function base64ToBlob(base64, mime) {
	mime = mime || '';
	let sliceSize = 1024;
	let byteChars = window.atob(base64);
	let byteArrays = [];
	
	for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
		let slice = byteChars.slice(offset, offset + sliceSize);
		
		let byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		
		let byteArray = new Uint8Array(byteNumbers);
		
		byteArrays.push(byteArray);
	}
	
	return new Blob(byteArrays, {type: mime});
}


class Upload extends Component {
	
	state = {
		uploadError: null,
		uploaded: undefined
	};
	
	async handleSubmit(e) {
		
		e.preventDefault();
		
		this.setState({
			uploaded: false
		});
		
		let url = API_URL + '/story';
		let hashtag = this.hashtag.value.replace(/\s/g, '').split('#').join(' #');
		
		let img_b64 = this.props.location.state.file;
		img_b64 = img_b64.replace(/^data:image\/(png|jpg);base64,/, "");
		let blob = base64ToBlob(img_b64);
		let body = new FormData();
		body.append("description", this.description.value);
		body.append("hashtag", hashtag);
		body.append("username", this.state.user);
		body.append("story", blob);
		
		fetch(url, {
			method: 'POST',
			credentials: 'include',
			body: body,
		}).then((res) => res.json()
		).then((response) => {
			this.setState({
				uploaded: true
			});
		}).catch(err => {
			this.setState({
				uploaded: true
			});
			console.log(err)
		});
	}
	
	render() {
		const {
			uploaded
		} = this.state;
		
		console.log(this.props)
		
		return <div>
			<div className={'header-upload'}>
				<i className={"fa fa-arrow-left"} onClick={this.props.history.goBack}/>
			</div>
			<section className={'fs-fafafa'}>
				<div className={'content'}>
					<div className={'content-form'}>
						<div>
							{uploaded === true
								? <Redirect to={"/"}/>
								: uploaded === false
									? <CircleSpinner/>
									: <form onSubmit={e => this.handleSubmit(e)}>
										<img className={"thumbnail-upload"}
										     alt={"thumbnail's place"}
										     src={this.props.location.state.file}/>
										<div className={'tooltip inpt-d'}>
											<input autoFocus
											       className={'inpt-f'}
											       ref={(ref) => {
												       this.description = ref
											       }}
											       type='text'
											       name='description'
											       placeholder='Ajouter une description'/>
										</div>
										<div className={'tooltip inpt-d'}>
											<input className={'inpt-f'}
											       ref={(ref) => {
												       this.hashtag = ref
											       }}
											       type='text'
											       name='hashtag'
											       placeholder='Hashtags'/>
										</div>
										<input className={'btn-form'}
										       type='submit'
										       value='Envoyer'/>
									</form>}
						</div>
					</div>
				</div>
			</section>
		</div>;
	}
}

export default Upload;