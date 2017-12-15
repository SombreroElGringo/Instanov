import React from 'react'
import Spinner from 'react-spinkit'

const CircleSpinner = () => <div
	style={{
		display: "flex",
		justifyContent: "center",
	}}>
	<Spinner fadeIn={"none"}
	         name={"circle"}/>
</div>;

export default CircleSpinner;