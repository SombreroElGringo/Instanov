import React from 'react'
import Spinner from 'react-spinkit'

const Loader = () => <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "50px 0"}}>
	<Spinner name={"three-bounce"}
	         fadeIn='none'/>
</div>;

export default Loader;