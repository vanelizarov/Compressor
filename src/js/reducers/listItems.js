import {PUSH_ITEM} from '../actions/types';

const defaultState = {
    items: []
};

const createUUID = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case PUSH_ITEM:
            return Object.assign({}, state, {
                items: [
                    {
                        id: createUUID()
                    },
                    ...state.items
                ]
            });
        default:
            return state;
    }
}