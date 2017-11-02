import React, {Component} from 'react';
import {Header, News, Content} from './components'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<div style={{overflow: 'scroll', height: 'calc(100vh - 46px)'}}>
					<News/>
					<Content/>
				</div>
			</div>
		);
	}
}

export default App;
