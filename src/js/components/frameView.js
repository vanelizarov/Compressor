import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    setImageData,
    setIsStreaming,
    setFrameData
} from '../actions';

import types from '../logic/types';

class FrameView extends Component {

    componentDidMount() {
        if (this.props.original) {

            window.setInterval(() => {

                if (this.props.stream && this.props.canPlay) {
                    let cameraContext = this.outputView.getContext('2d');
                    let {width: w, height: h} = this.outputView;
                    let bcr = this.outputView.getBoundingClientRect();

                    this.props.setFrameData({
                        type: types.ORIGINAL,
                        data: bcr
                    });

                    cameraContext.drawImage(this.props.stream, 0, 0, w, h);

                    let pixels = cameraContext.getImageData(0, 0, w, h).data;
                    this.props.setImageData({
                        type: types.ORIGINAL,
                        data: pixels,
                        size: pixels.length,
                    });
                    // console.log((new Date()).getTime());
                    //console.log(this.props.types[types.ORIGINAL]);
                }

            }, 40);

        } else {

            window.setInterval(() => {

                if (this.props.stream && this.props.canPlay) {
                    let originalImgData = this.props.types[types.ORIGINAL].data;
                    let {width: w, height: h} = this.outputView;

                    if (this.props.encodeFunc && !this.props.reformatFunc) {
                        this.props.encodeFunc(originalImgData, (encoded, encTime, byteLength) => {

                            this.props.setImageData({
                                type: this.props.compType,
                                data: encoded,
                                time: encTime,
                                size: byteLength
                            });

                            //console.log(`--> Compression time ${this.props.compType} ${encTime}`);

                            if (this.props.decodeFunc) {
                                this.props.decodeFunc(encoded, (decoded, decTime) => {

                                    const bcr = this.outputView.getBoundingClientRect();

                                    this.props.setFrameData({
                                        type: this.props.uncompType,
                                        data: bcr
                                    });

                                    this.props.setImageData({
                                        type: this.props.uncompType,
                                        data: decoded,
                                        time: decTime,
                                    });



                                    //console.log(`--> Decompression time ${this.props.uncompType} ${decTime}`);

                                    let restored = new ImageData(Uint8ClampedArray.from(decoded), w, h);
                                    this.outputView.getContext('2d').putImageData(restored, 0, 0);

                                });
                            } else {
                                // No decode function specified

                                let imageData = new ImageData(Uint8ClampedArray.from(encoded), w, h);
                                this.outputView.getContext('2d').putImageData(imageData, 0, 0);

                            }

                        });
                    } else {

                        const size = 4 * w * h;

                        this.props.reformatFunc(this.props.types[this.props.compType].data, size, (reformatted) => {

                            const bcr = this.outputView.getBoundingClientRect();

                            this.props.setFrameData({
                                type: this.props.compType,
                                data: bcr
                            });

                            let imageData = new ImageData(Uint8ClampedArray.from(reformatted), w, h);
                            this.outputView.getContext('2d').putImageData(imageData, 0, 0);

                        })

                    }

                }

            }, 40);

        }
    }

    render() {
        if (this.props.canPlay) {
            return (
                <div className={'frame-view'} >
                    <div className="frame-view--output-wrapper"
                         data-title={this.props.title}>
                        <canvas className="frame-view--output"
                                ref={(outputView) => {this.outputView = outputView}}>
                        </canvas>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="frame-view">
                    <div className="frame-view--message">
                        No stream available
                    </div>
                </div>
            )
        }
    }

}

FrameView.propTypes = {
    original: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    encodeFunc: React.PropTypes.func,
    reformatFunc: React.PropTypes.func,
    decodeFunc: React.PropTypes.func,
    compType: React.PropTypes.string,
    uncompType: React.PropTypes.string
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setImageData: setImageData,
        setIsStreaming: setIsStreaming,
        setFrameData: setFrameData
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        stream: state.exchanges.stream,
        types: state.exchanges.types,
        canPlay: state.exchanges.canPlay,
        streaming: state.exchanges.streaming
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(FrameView);