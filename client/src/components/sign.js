import React, {Component} from "react";

const API_URL = process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL;

export default class Sign extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          type: this.props.type || 'signin',
        }
    }

    /*componentDidMount() {
        
        
        // Get data from API
        fetch(apiUrl, {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((json) => {
            console.log()
            console.log(json)
        });
    }*/

    handleClick(e) {
        let newType = this.state.type === 'signup' ? 'signin' : 'signup';
        this.setState({
            type: newType,
        });
    }

	render(){
		const {
			type,
		} = this.state;
		
		return (
            <div className={'content'}>
                <div className={'content-form'}>
                    <h1 className={'app-title'}>Instanov</h1>
                    {type === 'signup' ? (
                        <div>
                            <h2 className={'app-sub-title'}>Inscrivez-vous pour voir les photos & vidéos de vos amis!</h2>
                            <span className='info'></span>
                            <form method='POST' action={API_URL + '/signup'}>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='text' name='email' placeholder='E-mail'/>
                                </div>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='text' name='name' placeholder='Nom complet'/>
                                </div>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='text' name='username' placeholder="Nom d'utilisateur"/>
                                </div>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='password' name='password' placeholder='Mot de passe'/>
                                </div>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='password' name='confirmPassword' placeholder='Confirmer le mot de passe'/>
                                </div>
                                <input className={'btn-form'} type='submit' value='Inscription'/>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <span className='info'></span>
                            <form method='POST' action={API_URL + '/login'}>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='text' name='email' placeholder='E-mail'/>
                                </div>
                                <div className={'inpt-d'}>
                                    <input className={'inpt-f'} type='password' name='password' placeholder='Mot de passe'/>
                                </div>
                                <input className={'btn-form'} type='submit' value='Se connecter'/>
                            </form>
                        </div>      
                    )}

                    <div className={'_lines'}>
                        <div className={'_line'}></div>
                        <div className={'_OR'}>ou</div>
                        <div className={'_line'}></div>
                    </div>

                    <div> 
                        {type === 'signup' ? (
                           
                            <h3 className={'form-note'}>
                                Vous avez un compte ? <a className={'form-note-lk'} onClick={(e) => this.handleClick(e)}>Connectez-vous</a>
                            </h3>
                        
                        ) :(
                            
                            <h3 className={'form-note'}>
                                Vous n'avez pas de compte ? <a className={'form-note-lk'} onClick={(e) => this.handleClick(e)}>Inscrivez-vous</a>
                            </h3>
                            
                        )}
                    </div>
                </div>    
            </div>
        );
	}
}