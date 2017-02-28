import {
    SET_IMG_DATA,
    SET_VIDEO_STREAM
} from './types';


export const sendImageData = (payload) => {
    return {
        type: SET_IMG_DATA,
        payload // payload: { data: ... }
    }
};

export const sendVideoStream = (payload) => {
    return {
        type: SET_VIDEO_STREAM,
        payload
    }
};