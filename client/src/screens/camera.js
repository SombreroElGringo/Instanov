import React from 'react'
import {Link} from 'react-router-dom'

require("./camera.css");

export default class Camera extends React.Component {
	state = {
		stream: null,
		showFace: false,
		currentFilter: 0,
		filters: [
			"",
			"/filters/glasses.png",
			"/filters/putin.png",
			"/filters/mask.png"
		]
	};
	
	render() {
		return <div className={'camera animated fadeIn'}>
			<div className={'header'}>
				<Link to={"/"}>
					<i className={"fa fa-arrow-left"}/>
				</Link>
			</div>
			<div className={"analysis-block"}
			     ref={ref => this.spaceToCapture = ref}>
				<video ref={ref => this.video = ref}
				       width={window.innerWidth}
				       height={window.innerHeight}/>
				<canvas ref={ref => this.canvas = ref}
				        width={window.innerWidth}
				        height={window.innerHeight}/>
			</div>
			<div className="controls">
				<div/>
				<div className="capture"
				     onClick={() => this.captureImage()}/>
				<div style={{display:"flex", alignItems:"center", fontSize: 40}}>
					<i className={"fa fa-user"} onClick={() => this.switchFilter()}/>
				</div>
			</div>
			<img className={"thumbnail"}
			     alt={"thumbnail's place"}
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
		console.log(this.props.history.push("/upload", {file: this.thumbnail.src}))
		//this.thumbnail.style.opacity = 0;
		//setTimeout(() => this.thumbnail.style.display = "none", 400)
	}
	
	setUpCanvas() {
	
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
				this.ctracker = ctracker;
				let requestAnimFrame = window.requestAnimationFrame;
				ctracker.init();
				ctracker.start(videoInput);
				
				let canvasInput = this.canvas;
				let cc = canvasInput.getContext('2d');
				
				
				const face = new Image();
				const context = this.canvas.getContext("2d");
				const drawLoop = () => {
					requestAnimFrame(drawLoop);
					cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
					
					this.drawFace(context, face)
					
					
				}
				
				drawLoop();
				
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
			if (this.canvas.width < this.canvas.height) {
				multiplicator = this.canvas.height / this.video.videoHeight;
				newHeight = this.video.videoHeight * multiplicator;
				newWidth = this.video.videoWidth * multiplicator;
				toLeft = (-newWidth / 2) + (this.canvas.width / 2);
			} else {
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
			
			const face = new Image();
			this.drawFace(ctx, face);
			
			
			this.thumbnail.src = this.canvas.toDataURL('image/png');
			ctx.transform(-1, 0, 0, 1, this.canvas.width, 0);
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}, 100)
	}
	
	switchFilter() {
		console.log(this.state)
		this.setState({
			currentFilter: (this.state.currentFilter+1) % this.state.filters.length,
		})
	}
	
	drawFace(context, face) {
		face.src = this.state.filters[this.state.currentFilter];
		const pos = this.ctracker && this.ctracker.getCurrentPosition();
		if (typeof pos === "object") {
			const [x, y] = pos[33];
			const ratio = (face.height * 250) / face.width;
			const width = 250;
			const height = ratio;
			context.drawImage(face, x - (width / 2), y - (height / 2), width, height);
		}
	}
}