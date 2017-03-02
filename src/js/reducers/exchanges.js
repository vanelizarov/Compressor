import {
    SET_IMG_DATA,
    SET_VIDEO_STREAM,
    SET_CAN_PLAY,
    SET_IS_STREAMING
} from '../actions/types';

import {
    ORIGINAL
} from '../logic/types';

export default (state = {canPlay: false, streaming: false}, action) => {

    switch (action.type) {

        case SET_IMG_DATA:

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    [action.payload.type]: action.payload.data
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

        default:
            return state;


    }

};