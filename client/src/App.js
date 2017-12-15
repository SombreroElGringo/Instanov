import React, {Component} from 'react';
import './assets/css/App.css';
import {Provider} from 'react-redux'
import store from './store/index'
import Routing from "./components/routing";


class App extends Component {
	render() {
		return <Provider store={store}>
			<Routing />
		</Provider>;
	}
}

export default App;
