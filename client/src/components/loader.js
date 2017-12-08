import React from 'react'
import Spinner from 'react-spinkit'

const Loader = () => <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
	<Spinner name={"three-bounce"}
	         fadeIn='none'/>
</div>;

export default Loader;