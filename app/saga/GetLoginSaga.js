import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';

import {httpCall} from '../core/dataService';
import {LOGIN, LOGOUT, LOADING} from '../actions/actions';
import {SHOW, HIDE} from '../actions/actions';
import {toShow, toHide} from '../actions/actions';
import {toLogin, toLoading, toLogout} from '../actions/actions';

export function * axiosData(actions) {
    try {
        console.log('have been triggered');
        console.log(actions);
        const data = yield call(httpCall,'post', '/login', actions.data);
        const history = actions.history;
        console.log(data);
        if(data.success > 0){
            yield put(toLogin(data.success));
            yield call(history.push, '/thankyou')
        }else{
            yield put(toHide());
            yield put(toLogout());
        }
    } catch (error) {
        yield put(toHide());
        yield put(toLogout());
    }
}

export function * watchAxiosData() {
    console.log('This is Saga watch');
    yield takeEvery(LOADING, axiosData);
}