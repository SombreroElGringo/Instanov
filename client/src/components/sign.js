import React, {Component} from "react";
import Bubble from "./bubble";

export default class Sign extends Component{

    componentDidMount() {
        
            // Get data from API
            fetch('http://localhost:5000')
              // parse response
              .then((res) => res.json())
              // use parsed response
              .then((json) => {
                console.log(json)
              });
          }

	render(){
		const {
			type,
		} = this.props;
		
		return (
            <div className={'content'}>
                <div className={'form'}>
                    <h1>Instanov</h1>
                    {type === 'signup' ? (
                        <div>
                            <h2>Inscrivez-vous pour voir les photos & vidéos de vos amis!</h2>
                            <form method='POST' action='http://localhost:5000/signup'>
                                <input type='text' name='email' placeholder='E-mail'/>
                                <input type='text' name='name' placeholder='Nom complet'/>
                                <input type='text' name='username' placeholder="Nom d'utilisateur"/>
                                <input type='text' name='password' placeholder='Mot de passe'/>
                                <input type='text' name='confirmPassword' placeholder='Mot de passe'/>
                                <input type='submit' value='Inscription'/>
                            </form>
                        </div>
                    ) : (
                        <form method='POST' action='localhost:5000/login'>
                            <input type='text' name='email' placeholder='E-mail'/>
                            <input type='text' name='password' placeholder='Mot de passe'/>
                            <input type='submit' value='Se connecter'/>
                        </form>      
                    )}
                </div>    
            </div>
        );
	}
}