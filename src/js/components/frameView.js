import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {sendImageData} from '../actions';

import {encode} from '../logic/huffman';
import types from '../logic/types';

class FrameView extends Component {

    _drawStream(img) {
        let cameraContext = this.outputView.getContext('2d');
        let {width: w, height: h} = this.outputView;

        window.setInterval(() => {
            cameraContext.drawImage(img, 0, 0, w, h);
        }, 35);
    }

    componentDidUpdate() {
        this._drawStream(this.props.types[this.props.type]);
    }

    render() {
       return (
           <div className={'frame-view'} >
               <canvas className="frame-view--output" ref={(outputView) => { this.outputView = outputView }}>

               </canvas>
           </div>
       )
    }

}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        sendImageData: sendImageData
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        types: state.exchanges.types
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(FrameView);