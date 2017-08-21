import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {LOGIN} from '../actions/actions';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return this.props.loginStatus.success
            ? (<this.props.component/>)
            : (<Redirect to="/"/>);
    }
}

export default PrivateRoute;