import React from 'react'
import {Link} from 'react-router-dom'
require('tracking/build/tracking-min');
require('tracking/build/data/face-min');
require('tracking/build/data/eye-min');
require('tracking/build/data/mouth-min');
//const dat = require('dat.gui/build/dat.gui');
const tracking = window.tracking;

export default class Camera extends React.Component {
	state = {
		stream: null
	};
	
	componentDidMount() {
		const video = this.camera;
		const canvas = this.canvas;
		const context = canvas.getContext('2d');
		
		const tracker = new tracking.ObjectTracker('face');
		tracker.setInitialScale(4);
		tracker.setStepSize(2);
		tracker.setEdgesDensity(0.1);
		tracking.track(video, tracker, {camera: true});
		tracker.on('track', (event) => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			event.data.forEach((rect) => {
				//context.strokeStyle = '#a64ceb';
				//context.strokeRect(rect.x, rect.y, rect.width, rect.height);
				//context.font = '11px Helvetica';
				//context.fillStyle = "#fff";
				//context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
				//context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
				this.setState({
					//rect: <img src={"https://m.popkey.co/8618d2/DyVJx.gif"} style={{
					//rect: <img src={"http://www.freeiconspng.com/uploads/trump-face-png-21.png"} style={{
					rect: <img src={"http://pngimg.com/uploads/hitler/hitler_PNG10.png"} style={{
						backgroundImage: 'url("")',
						position: 'absolute',
						top: rect.y-20,
						right: rect.x,
						width: rect.width,
						//height: rect.height
					}} alt={''}/>
				})
			});
		});
		
		//var gui = new dat.GUI();
		//gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
		//gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
		//gui.add(tracker, 'stepSize', 1, 5).step(0.1);
		
		navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: 'user'
			}
		}).then(stream => {
			this.camera.srcObject = stream;
		});
		
		
	}
	
	render() {
		
		
		return <div className={'camera'}>
			<div style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
				<Link to="/" className={'camera-close p-1'} style={{color: 'white'}}>
					<i className={'fa fa-close '}/>
				</Link>
			</div>
			<div className={'camera-visualizer'} style={{flex: 1, width: window.innerWidth, position: 'relative'}}>
				<video
					classID={'camera'}
					ref={ref => this.camera = ref}
					playsInline={true}
					autoPlay={true}
					muted={true}
					width={window.innerWidth}
					style={{height: '100%', position: 'absolute', transform: 'rotateY(180deg)'}}
				/>
				<canvas ref={ref => this.canvas = ref} style={{
					position: 'absolute',
					height: '100%',
					width: window.innerWidth
				}}/>
				{this.state.rect}
			</div>
			<div>
			</div>
		</div>
	}
}