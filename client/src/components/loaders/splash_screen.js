import React from 'react'
import Spinner from 'react-spinkit'

class SplashScreen extends React.Component{
	render(){
		return <div className={"splash_screen"}>
			<Spinner name="double-bounce" fadeIn={"none"}/>
		</div>
	}
}

export default SplashScreen;