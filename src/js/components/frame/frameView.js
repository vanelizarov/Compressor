import React, {Component} from 'react';

class FrameView extends Component {

    componentDidMount() {

        if (this.props.isOriginal) {

            require('webrtc-adapter');

            const constraints = {
                audio: false,
                video: {
                    width: 240,
                    height: 135,
                    facingMode: 'user'
                }
            };

            window.navigator.mediaDevices.getUserMedia(constraints)
                .then(this._onMediaStream.bind(this))
                .catch(this._onStreamError);

        }

    }

    _onMediaStream(stream) {
        window.stream = stream;
        this.virtualVideo.srcObject = stream;
        this._drawStream(this.virtualVideo);
    }

    _onStreamError(error) {
        let errStr = `${error}`;
        console.log(`--> Error getting video stream: ${errStr}`);
        window.alert(errStr);
    }

    _drawStream(img) {
        let cameraContext = this.canvas.getContext('2d');
        let {width: w, height: h} = this.canvas;
        //console.log(w, h);

        window.setInterval(() => {
            cameraContext.drawImage(img, 0, 0, w, h);
            let imageData = cameraContext.getImageData(0, 0, w, h);
            cameraContext.putImageData(imageData, 0, 0);
        }, 33);
    }

    render() {

        const isOriginal = this.props.isOriginal;

        if (isOriginal) {
            return (
                <div className={'frame-view ' + this.props.className}>
                    <canvas ref={(canvas) => { this.canvas = canvas }}>

                    </canvas>
                    <video autoPlay={true} className={'virtual-video'} ref={(virtualVideo) => { this.virtualVideo = virtualVideo }}>

                    </video>
                </div>
            )
        } else {
            return (
                <div className={'frame-view ' + this.props.className}>
                    <canvas ref={(canvas) => { this.canvas = canvas }}>

                    </canvas>
                </div>
            )
        }

    }

}

FrameView.propTypes = {
    isOriginal: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired
};

export default FrameView;