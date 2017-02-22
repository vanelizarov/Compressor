import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { sendImageData } from '../../actions';

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

        const sendImageData = this.props.sendImageData;

        window.setInterval(() => {
            cameraContext.drawImage(img, 0, 0, w, h);
            let imageData = cameraContext.getImageData(0, 0, w, h);

            sendImageData({
                data: imageData
            });

            cameraContext.putImageData(imageData, 0, 0);
        }, 2000);
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

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        sendImageData: sendImageData
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, matchDispatchToProps)(FrameView);