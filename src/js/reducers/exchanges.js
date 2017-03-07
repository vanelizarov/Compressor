import {
    SET_IMG_DATA,
    SET_VIDEO_STREAM,
    SET_CAN_PLAY,
    SET_IS_STREAMING,
    SET_FRAME_DATA
} from '../actions/types';

import {
    ORIGINAL
} from '../logic/types';

export default (state = {canPlay: false, streaming: false}, action) => {

    switch (action.type) {

        case SET_IMG_DATA:

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    [action.payload.type]: {
                        data: action.payload.data,
                        time: action.payload.time,
                        size: action.payload.size,
                        bcr: action.payload.bcr
                    }
                })
            });

        case SET_VIDEO_STREAM:

            return Object.assign({}, state, {
                stream: action.payload
            });

        case SET_CAN_PLAY:
            return Object.assign({}, state, {
                canPlay: true
            });

        case SET_IS_STREAMING:
            return Object.assign({}, state, {
                streaming: true
            });

        case SET_FRAME_DATA:
            return Object.assign({}, state, {
                frames: Object.assign({}, state.frames, {
                    [action.payload.type]: action.payload.data
                })
            });

        default:
            return state;


    }

};