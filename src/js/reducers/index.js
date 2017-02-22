import {combineReducers} from 'redux';

import imgDataExchange from './imgDataExchange';

const allReducers = combineReducers({
    imgData: imgDataExchange
});

export default allReducers;