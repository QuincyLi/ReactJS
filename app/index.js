import React from 'react';
import ReactDOM from 'react-dom';

//components
import Router from './routerIndex/routerIndex';
import Store from './store/store';

//css
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Router store = {Store}/>,
     document.getElementById('app')
);