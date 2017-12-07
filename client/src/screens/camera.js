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
				<video ref={ref => this.video = ref} width={window.innerWidth} height={window.innerHeight}/>
				<canvas ref={ref => this.canvas = ref} width={window.innerWidth} height={window.innerHeight}/>
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
		const face = new Image();
		face.src = "http://pluspng.com/img-png/glasses-png-glasses-png-image-2400.png";
	
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
				
				let videoInput = this.video;
				let ctracker = new window.clm.tracker();
				let requestAnimFrame = window.requestAnimationFrame;
				ctracker.init();
				ctracker.start(videoInput);
				
				let canvasInput = this.canvas;
				let cc = canvasInput.getContext('2d');
				
				function drawLoop() {
					requestAnimFrame(drawLoop);
					cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
					ctracker.draw(canvasInput);
				}
				
				//drawLoop();
				
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
			
			let multiplicator;
			let newHeight;
			let newWidth;
			let toLeft = 0;
			let toTop = 0;
			if(this.canvas.width < this.canvas.height){
				multiplicator = this.canvas.height / this.video.videoHeight;
				newHeight = this.video.videoHeight * multiplicator;
				newWidth = this.video.videoWidth * multiplicator;
				toLeft = (-newWidth / 2) + (this.canvas.width / 2);
			}else{
				multiplicator = this.canvas.width / this.video.videoWidth;
				newHeight = this.video.videoHeight * multiplicator;
				newWidth = this.video.videoWidth * multiplicator;
				toTop = (-newHeight / 2) + (this.canvas.height / 2)
			}
			
			
			ctx.drawImage(
				this.video, toLeft, toTop,
				newWidth,
				newHeight
			);
			this.thumbnail.src = this.canvas.toDataURL();
			ctx.transform(-1, 0, 0, 1, this.canvas.width, 0);
			ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		}, 100)
	}
}