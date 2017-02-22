import {
    RECEIVED_IMG_DATA,
    SENT_IMG_DATA
} from './types';

export const receivedImageData = (payload) => {
    return {
        type: RECEIVED_IMG_DATA,
        payload // payload: { type: ..., data: ... }
    }
};

export const sentImageData = (payload) => {
    return {
        type: SENT_IMG_DATA,
        payload // payload: { data: ... }
    }
};