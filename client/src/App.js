import React, {Component} from 'react';
import {Header, News, Content} from './components'
import {Camera} from './screens'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import './App.css';

class App extends Component {
	render() {
		
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
			</div>
		</Router>;
	}
}

export default App;
