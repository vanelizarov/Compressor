import { ORIGINAL } from '../logic/transformations/types';
import {
    RECEIVED_IMG_DATA,
    SENT_IMG_DATA
} from '../actions/types';

import io from 'socket.io-client';
const socket = io(`https://compresssor.herokuapp.com:8080`);

const defaultState = {
    types: {
        //HUFFMAN_COMP: null,
        //HUFFMAN_UNCOMP: null // ...
    }
};

export default (state = defaultState, action) => {

    switch (action.type) {

        case RECEIVED_IMG_DATA:

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    [action.payload.type]: action.payload.data
                })
            });

        case SENT_IMG_DATA:

            socket.emit('client:sent_img_data', action.payload.data);

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    ORIGINAL: action.payload.data
                })
            });

        default:
            return state;


    }

};