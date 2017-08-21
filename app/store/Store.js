import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import toDoLogin from '../reducers/reducers';
import {axiosData,watchAxiosData} from '../saga/getLoginSaga';

const sagaMiddleware = createSagaMiddleware(watchAxiosData);

const store = createStore(toDoLogin, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAxiosData);

export default store;