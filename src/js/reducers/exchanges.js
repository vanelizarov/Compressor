import {
    SET_IMG_DATA,
    SET_VIDEO_STREAM
} from '../actions/types';

import {
    ORIGINAL
} from '../logic/types';

export default (state = {}, action) => {

    switch (action.type) {

        case SET_IMG_DATA:

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    [action.payload.type]: action.payload.data
                })
            });

        case SET_VIDEO_STREAM:

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    ORIGINAL: action.payload
                })
            });

        default:
            return state;


    }

};