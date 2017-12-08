import React, {Component} from 'react';
import {Camera, MainScreen} from './screens';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/css/App.css';
import Sign from './components/account/sign';
import Profile from './components/account/profile';
import {Provider} from 'react-redux'
import store from './store/index'
import HttpError from "./components/HttpError";
import {API_URL} from "./utils/env";


class App extends Component {
	componentWillMount() {
		this.checkAuth()
	}
	
	checkAuth() {
		fetch(API_URL, {credentials: "include"})
			.then(response => {
				if (!response.ok)
					throw new Error(response.statusText)
			})
			.catch(err => {
				console.log(err);
				if(window.location.pathname !== "/sign")
					window.location.href = "/sign";
			});
		
	}
	
	render() {
			return <Provider store={store}>
				<Router>
					<div>
						<Route exact
						       path={"/"}
						       component={MainScreen}/>
						<Route exact
						       path={"/camera"}
						       component={Camera}/>
						<Route exact
						       path={"/profiles/:username"}
						       component={Profile}/>
						<Route exact
						       path={"/sign"}
						       component={() => <Sign type={'signup'}/>}/>
                        <Route component={() => (
                            <HttpError error={{httpCode: "404"}} />
                        )}/>
					</div>
				</Router>
			</Provider>;
	}
}

export default App;
