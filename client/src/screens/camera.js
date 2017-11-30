import React from 'react'
import {Link} from 'react-router-dom'

require("./camera.css");

export default class Camera extends React.Component {
	state = {
		stream: null,
		showFace: false
	};
	
	render() {
		return <div className={'camera'}>
			<div className={'header'}>
				<Link to={"/"}>
					<i className={"fa fa-arrow-left"}/>
				</Link>
			</div>
			<div className={"analysis-block"}
			     ref={ref => this.spaceToCapture = ref}>
				<video ref={ref => this.video = ref}/>
				<canvas ref={ref => this.canvas = ref}/>
			</div>
			<div className="controls">
				<div className="capture"
				     onClick={() => this.captureImage()}/>
			</div>
			<img className={"thumbnail"}
			     ref={ref => this.thumbnail = ref}
			     src={"https://unsplash.it/1080/1520"}
			     onClick={() => this.dismissThumbnail()}/>
		</div>
	}
	
	componentDidMount() {
		this.setUpCamera();
		this.setUpCanvas();
	}
	
	dismissThumbnail() {
		this.thumbnail.style.opacity = 0;
		setTimeout(() => this.thumbnail.style.display = "none", 400)
	}
	
	setUpCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
	setUpCamera() {
		navigator.getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia ||
			navigator.oGetUserMedia;
		
		if (navigator.getUserMedia) {
			navigator.getUserMedia({video: true}, stream => {
				this.video.src = window.URL.createObjectURL(stream);
				this.video.play();
			}, err => {
				console.log(err)
			});
		}
	}
	
	captureImage() {
		this.thumbnail.style.display = "initial";
		setTimeout(() => {
			this.thumbnail.style.opacity = 1;
			const ctx = this.canvas.getContext("2d");
			ctx.transform(-1, 0, 0, 1, this.canvas.width, 0);
			
			
			console.log({
				video: {
					width: this.video.videoWidth,
					height: this.video.videoHeight
				},
				canvas: {
					width: this.canvas.width,
					height: this.canvas.height
				}
			});
			
			const multiplicator = this.canvas.height / this.video.videoHeight;
			const newHeight= this.video.videoHeight*multiplicator;
			const newWidth = this.video.videoWidth*multiplicator;
			
			ctx.drawImage(
				this.video, (-newWidth/2)+(this.canvas.width/2), 0,
				newWidth,
				newHeight
			);
			this.thumbnail.src = this.canvas.toDataURL();
			ctx.transform(-1, 0, 0, 1, this.canvas.width, 0);
			ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		}, 100)
	}
}