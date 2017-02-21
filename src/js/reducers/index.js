import {combineReducers} from 'redux';

import list from './listItems';

const allReducers = combineReducers({
    list: list
});

export default allReducers;