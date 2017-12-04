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
		stream: null,
		showFace: false
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
				this.setState({
					//rect: <img src={"http://www.freeiconspng.com/uploads/trump-face-png-21.png"} style={{
					rect: <img src={"http://pngimg.com/uploads/hitler/hitler_PNG10.png"} style={{
						backgroundImage: 'url("")',
						position: 'absolute',
						top: rect.y - 20,
						right: rect.x,
						width: rect.width,
						//height: rect.height
					}} alt={''}/>
				})
			});
		});
		
		navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: 'user'
			}
		}).then(stream => {
			if(this.camera)
				this.camera.srcObject = stream;
		});
	}
	
	captureImage() {
		const video = this.camera;
		const canvas    = document.createElement("canvas");
		canvas.width  = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d')
		      .drawImage(video, 0, 0, canvas.width, canvas.height);
		
			this.thumbnail.src = canvas.toDataURL();
			this.thumbnail.style.maxWidth = '100px';
			this.thumbnail.style.maxHeight = '100px';
			this.thumbnail.style.opacity = '1';
			this.thumbnail.style.transform = 'rotateY(180deg)';
		
		setTimeout(() => {
			this.thumbnail.removeAttribute('src');
			this.thumbnail.removeAttribute('style');
		}, 3000)
	};
	
	render() {
		return <div className={'camera'}>
			<img className="thumbnail" ref={ref => this.thumbnail = ref} />
			<div style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
				<Link to="/" className={'camera-close p-1'} style={{color: 'white'}}>
					<i className={'fa fa-arrow-left '}/>
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
				<div style={{display: !this.state.showFace ? 'none' : 'block'}}>
					{this.state.rect}
				</div>
			</div>
			<div style={{color: 'whitesmoke', fontSize: '30px', display: 'flex', justifyContent: 'space-between'}}>
				<div style={{flex: 1, display: 'flex', justifyContent: 'space-around'}}>
					<i className={'fa fa-image'}/>
					<i className={'fa fa-flash'}/>
				</div>
				<div style={{flex: 1}} onClick={() => this.captureImage()}>
					<div style={{
						position: 'relative',
						width: '80px',
						height: '80px',
						margin: '0 auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<div style={{
							position: 'absolute',
							backgroundColor: 'rgba(211, 211, 211, 0.49)',
							width: '100%',
							height: '100%',
							borderRadius: '50%',
						}}/>
						<div style={{
							position: 'absolute',
							backgroundColor: 'white',
							width: '70%',
							height: '70%',
							borderRadius: '50%'
						}}/>
					</div>
				</div>
				<div style={{flex: 1, display: 'flex', justifyContent: 'space-around'}}>
					<i className={'fa fa-refresh'}/>
					<i className={'fa fa-smile-o'} onClick={() => this.setState({showFace: !this.state.showFace})}/>
				</div>
			</div>
		</div>
	}
}