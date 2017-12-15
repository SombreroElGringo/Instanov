import React from 'react'
import {Camera, MainScreen, SinglePost} from '../screens';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Sign from './account/sign';
import Profile from './account/profile';
import HttpError from "./httpError";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {checkUser} from "../store/actions/auth";
import getIsAuth from "../store/selectors/get_is_auth";
import SplashScreen from './loaders/splash_screen'

class Routing extends React.Component{
	componentWillMount(){
		const {checkUser} = this.props;
		checkUser();
	}
	
	render(){
		const {isAuth} = this.props;
		let {pathname} = window.location;
		
		if(isAuth === undefined)
			return <SplashScreen />;
		return <Router>
			<Switch>
				<Route exact
				       path={"/sign"}
				       component={() => <Sign type={'signup'}/>}/>
				{!isAuth && pathname !== '/sign' && <Redirect to={"/sign"}/>}
				<Route exact
				       path={"/"}
				       component={MainScreen}/>
				<Route exact
				       path={"/posts/:id"}
				       component={SinglePost}/>
				<Route exact
				       path={"/camera"}
				       component={Camera}/>
				<Route exact
				       path={"/profiles/:username"}
				       component={Profile}/>
				
				<Route component={() => {
					console.log(404);
					return <HttpError error={{httpCode: "404"}}/>
				}}/>
			</Switch>
		</Router>
	}
}

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
	checkUser
},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routing);