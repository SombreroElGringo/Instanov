import React, {Component} from 'react';
import {Header, News, Content} from './components';
import {Camera} from './screens';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import './assets/css/App.css';
import Sign from './components/account/sign';
import Profile from './components/account/profile';

class App extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  isAuth: null,
		}
	}

	handleAuth = (auth) => {
		this.setState({
			isAuth: auth,
		});
	}

	render() {
		
		const {isAuth} = this.state;

		return <Router>
			<div>
				<Route exact path={"/"} component={() => <div>
					<div className="App animated fadeIn ">
						<Header />
						<div style={{overflow: 'scroll', height: 'calc(100vh - 46px)'}}>
							<News/>
							<Content/>
						</div>
					</div>
				</div>}/>
				<Route exact path={"/camera"} component={() => <div>
					<div className={'animated fadeIn'}>
						<Camera/>
					</div>
				</div>}/>

				<Route exact path={"/sign"} component={() => (
					<div>
						<section className={'fs-fafafa'}>
							<Sign type={'signup'} onAuth={this.handleAuth} isAuth={isAuth} />
						</section>
					</div>
				)}/>

				<Route exact path={"/profiles/:username"} component={() => (
					<div>
						<section className={'fs-fafafa'}>
							<Profile />
						</section>
					</div>
				)}/>

			</div>
		</Router>;
	}
}

export default App;
