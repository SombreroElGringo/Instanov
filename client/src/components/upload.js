import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {handle_auth} from "../store/actions/auth";
import {connect} from "react-redux";
import HttpError from "./httpError";
import getIsAuth from "../store/selectors/get_is_auth";
import {Link} from 'react-router-dom';
import tmp from './_tmp_file';

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

class Upload extends Component {

	//TODO : remove all tmp_file & _tmp_file.js

	constructor(props) {
		super(props);
		this.state = {
			tmp_file: tmp.tmp_file ,
			uploadError: null
		}
	}

	async handleSubmit(e) {

		e.preventDefault();

		console.log(this);
		let url = API_URL + '/story';
		let hashtag = this.hashtag.value.replace(/\s/g, '').split('#').join(' #');
		let file = new File([this.props.imageUrl || this.state.tmp_file], "filename");

		let body = new FormData;
		body.append("description", this.description.value);
		body.append("hastag", hashtag);
		body.append("username", this.state.user);
		body.append("file", file, "pic");

		console.log(body);

		fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'multipart/form-data'
			}),
			body: body,
		}).then((res) => res.json()
		).then((response) => {
			if (response.status === 'success') {
				this.props.handleAuth(true);
			} else {
				this.setState({
					uploadError: response
				});
			}
		}).catch(err => console.log(err));
	}

	render() {
		const {
			uploadError
		} = this.state;

		const {isAuth} = this.props;

		return (
			isAuth ? (
				<Redirect to="/"/>
			) : uploadError ? (
				<HttpError error={uploadError}/>
			) : (
				<div>
					<div className={'header-upload'}>
						<Link to={"/"}>
							<i className={"fa fa-arrow-left"}/>
						</Link>
					</div>
					<section className={'fs-fafafa'}>
						<div className={'content'}>
							<div className={'content-form'}>
								<div>
									<form onSubmit={e => this.handleSubmit(e)}>
										<img className={"thumbnail-upload"}
											 alt={"thumbnail's place"}
											 src={this.props.file || this.state.tmp_file}/>
										<div className={'tooltip inpt-d'}>
											<input autoFocus className={'inpt-f'}
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
									</form>
								</div>
							</div>
						</div>
					</section>
				</div>
			)
		);
	}
}

const mapStateToProps = (state) => ({isAuth: getIsAuth(state)});
const mapDispatchToProps = (dispatch) => bindActionCreators({handleAuth: handle_auth}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Upload)