import React, {Component} from 'react';
import {Camera, MainScreen} from './screens';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './assets/css/App.css';
import Sign from './components/account/sign';
import Profile from './components/account/profile';
import {Provider} from 'react-redux'
import store from './store/index'
import HttpError from "./components/HttpError";


class App extends Component {
	state = {
		isAuth: null,
	};
	
	componentWillMount(){
		// this.checkAuth()
	}
	
	checkAuth(){
		const {isAuth} = store.getState().auth;
		const {pathname} = window.location;
		
		if (!isAuth && pathname !== '/sign')
			window.location.href = "/sign";
		else if (isAuth && pathname === '/sign')
			window.location.href = "/"
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
