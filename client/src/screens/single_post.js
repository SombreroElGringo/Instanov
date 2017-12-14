import React from 'react'
import getPost from "../store/selectors/get_post";

class SinglePost extends React.Component{
	render(){
		console.log(this.props);
		
		return <div>
			Bonjour
		</div>
	}
}

const mapStateToProps = (state) => ({
	post: getPost(state)
});

export default SinglePost