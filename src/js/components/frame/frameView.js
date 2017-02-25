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

        } else {
            let outputContext = this.outputView.getContext('2d');
            let image = new Image();

            window.setInterval(() => {
                image.onload = () => {
                    outputContext.drawImage(image, 0, 0);
                };
                image.src = 'data:image/png;base64,' + this.props.data;
            }, 35)
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
        let cameraContext = this.outputView.getContext('2d');
        let {width: w, height: h} = this.outputView;
        //console.log(w, h);

        const sendImageData = this.props.sendImageData;

        window.setInterval(() => {
            cameraContext.drawImage(img, 0, 0, w, h);

            sendImageData({
                data: this.outputView.toDataURL('png').replace('data:image/png;base64,', '')
                //data:image/png;base64,
            });


        }, 35);
    }

    render() {

        const isOriginal = this.props.isOriginal;

        if (isOriginal) {
            return (
                <div className={'frame-view'} >
                    <canvas className="frame-view--output" ref={(outputView) => { this.outputView = outputView }}>

                    </canvas>
                    <video autoPlay={true} className={'virtual-video'} ref={(virtualVideo) => { this.virtualVideo = virtualVideo }}>

                    </video>
                </div>
            )
        } else {
            return (
                <div className={'frame-view'}>
                    <canvas ref={(outputView) => { this.outputView = outputView }} className="frame-view--output">

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