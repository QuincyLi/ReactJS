import {combineReducers} from 'redux';

import {LOGOUT, LOADING, LOGIN} from '../actions/actions';
import {SHOW, HIDE} from '../actions/actions';

function getUserStatus(status = LOGOUT, action) {
    switch (action.type) {
        case LOGIN:
            return {type: LOGIN, success: true};

        case LOADING:
            return {type: LOGIN, success: false};

        case LOGOUT:
            return {type: LOGIN, success: false};

        default:
            return status;
    }
}

const initialComponents = {
    type: HIDE,
    isShow: false
}

function showOrHide(originalStatus = initialComponents, action) {
    switch (action.type) {
        case SHOW:
            return {
                ...action,
                isShow: true
            };
        case HIDE:
            return {
                ...action,
                isShow: false
            };

        default:
            return originalStatus;
    }
}

const toDoLogin = combineReducers({userStatus: getUserStatus, componentsStatus: showOrHide});

export default toDoLogin;