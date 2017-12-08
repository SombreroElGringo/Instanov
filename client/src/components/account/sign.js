import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {handle_auth} from "../../store/auth";
import {connect} from "react-redux";
import HttpError from "../HttpError";

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

class Sign extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type || 'signin',
            isAuth: this.props.isAuth || null,
            errors: [],
            unhandledError: null
        }
    }

    handleClick(e) {
        let newType = this.state.type === 'signup' ? 'signin' : 'signup';
        this.setState({
            type: newType,
            errors: []
        });
    }

    async handleSubmit(e) {
        this.setState({
            errors: []
        });

        e.preventDefault();
        let url = this.state.type === 'signup' ? API_URL + '/signup' : API_URL + '/login';
        let body = '';

        if (this.state.type === 'signup') {
            body += `email=${this.email.value}`;
            body += `&name=${this.name.value}`;
            body += `&username=${this.username.value}`;
            body += `&password=${this.password.value}`;
            body += `&confirmPassword=${this.confirmPassword.value}`;
        } else {
            body += `email=${this.email.value}`;
            body += `&password=${this.password.value}`;
        }

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: body,
        }).then((res) => res.json()
        ).then((response) => {
            if (response.status === 'success') {
                /*this.setState({
                    isAuth: true,
                })*/
                this.props.handleAuth(true);
            } else {
                // Error handling
                if (response.code === 400) {
                    this.setState({
                        errors: response.message || []
                    });
                } else {
                    this.setState({
                        unhandledError: response
                    });
                }
            }
        }).catch(err => console.log(err));
    }

    render() {
        const {
            type,
            errors,
            unhandledError
        } = this.state;

        const {isAuth} = this.props;

        const emailError = errors.find(e => e.param === 'email') || null;
        const nameError = errors.find(e => e.param === 'name') || null;
        const usernameError = errors.find(e => e.param === 'username') || null;
        const passwordError = errors.find(e => e.param === 'password') || null;
        const confirmPasswordError = errors.find(e => e.param === 'confirmPassword') || null;

        return (
            isAuth ? (
                <Redirect to="/"/>
            ) : unhandledError ? (
                <HttpError error={unhandledError}/>
            ) : (
                <div>
                    <section className={'fs-fafafa'}>
                        <div className={'content'}>
                            <div className={'content-form'}>
                                <h1 className={'app-title'}>Instanov</h1>
                                {type === 'signup' ? (
                                    <div>
                                        <h2 className={'app-sub-title'}>Inscrivez-vous pour voir les photos & vidéos de
                                            vos amis!</h2>
                                        <span className='info'/>
                                        <form onSubmit={e => this.handleSubmit(e)}>
                                            <div
                                                className={emailError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'}>
                                                <span
                                                    className={emailError ? 'tooltiptext' : 'invisible'}>{emailError && emailError.msg}</span>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.email = ref
                                                       }}
                                                       type='text'
                                                       name='email'
                                                       placeholder='E-mail'/>
                                            </div>
                                            <div className={nameError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'}>
                                                <span
                                                    className={nameError ? 'tooltiptext' : 'invisible'}>{nameError && nameError.msg}</span>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.name = ref
                                                       }}
                                                       type='text'
                                                       name='name'
                                                       placeholder='Nom complet'/>
                                            </div>
                                            <div
                                                className={usernameError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'}>
                                                <span
                                                    className={usernameError ? 'tooltiptext' : 'invisible'}>{usernameError && usernameError.msg}</span>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.username = ref
                                                       }}
                                                       type='text'
                                                       name='username'
                                                       placeholder="Nom d'utilisateur"/>
                                            </div>
                                            <div
                                                className={passwordError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'}>
                                                <span
                                                    className={passwordError ? 'tooltiptext' : 'invisible'}>{passwordError && passwordError.msg}</span>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.password = ref
                                                       }}
                                                       type='password'
                                                       name='password'
                                                       placeholder='Mot de passe'/>
                                            </div>
                                            <div
                                                className={confirmPasswordError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'}>
                                                <span
                                                    className={confirmPasswordError ? 'tooltiptext' : 'invisible'}>{confirmPasswordError && confirmPasswordError.msg}</span>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.confirmPassword = ref
                                                       }}
                                                       type='password'
                                                       name='confirmPassword'
                                                       placeholder='Confirmer le mot de passe'/>
                                            </div>
                                            <input className={'btn-form'}
                                                   type='submit'
                                                   value='Inscription'/>
                                        </form>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className={'app-sub-title'}>Vous nous avez manqué !</h2>
                                        <span className='info'/>
                                        <form onSubmit={e => this.handleSubmit(e)}>
                                            <div className={'inpt-d'}>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.email = ref
                                                       }}
                                                       type='text'
                                                       name='email'
                                                       placeholder='E-mail'/>
                                            </div>
                                            <div className={'inpt-d'}>
                                                <input className={'inpt-f'}
                                                       ref={(ref) => {
                                                           this.password = ref
                                                       }}
                                                       type='password'
                                                       name='password'
                                                       placeholder='Mot de passe'/>
                                            </div>
                                            <input className={'btn-form'}
                                                   type='submit'
                                                   value='Se connecter'/>
                                        </form>
                                    </div>
                                )}

                                <div className={'_line'}>
                                    <span className={'_t_line'}>OU</span>
                                </div>

                                <div>
                                    {type === 'signup' ? (

                                        <h3 className={'form-note'}>
                                            Vous avez un compte ? <a className={'form-note-lk'}
                                                                     onClick={(e) => this.handleClick(e)}>Connectez-vous</a>
                                        </h3>

                                    ) : (

                                        <h3 className={'form-note'}>
                                            Vous n'avez pas de compte ? <a className={'form-note-lk'}
                                                                           onClick={(e) => this.handleClick(e)}>Inscrivez-vous</a>
                                        </h3>

                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        );
    }
}

const mapStateToProps = ({auth}) => ({isAuth: auth.isAuth});
const mapDispatchToProps = (dispatch) => bindActionCreators({handleAuth: handle_auth}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sign)