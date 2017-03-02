import {
    SET_IMG_DATA,
    SET_VIDEO_STREAM,
    SET_CAN_PLAY,
    SET_IS_STREAMING
} from './types';


export const setImageData = (payload) => {
    return {
        type: SET_IMG_DATA,
        payload // payload: { data: ... }
    }
};

export const setVideoStream = (payload) => {
    return {
        type: SET_VIDEO_STREAM,
        payload
    }
};

export const setCanPlay = () => {
    return {
        type: SET_CAN_PLAY
    }
};

export const setIsStreaming = () => {
    return {
        type: SET_IS_STREAMING
    }
};

