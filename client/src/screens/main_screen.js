import React from 'react';
import {Header, News, Content} from '../components';

class MainScreen extends React.Component{
	
	render(){
		return <div>
			<div className="App animated fadeIn ">
				<Header/>
				<div style={{overflow: 'scroll', height: 'calc(100vh - 46px)'}}>
					<News/>
					<Content/>
				</div>
			</div>
		</div>
	}
}

export default MainScreen