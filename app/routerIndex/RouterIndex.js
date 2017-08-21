import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider, connect} from 'react-redux';

import {callLogin} from '../core/DataService';
import {toLogin, toLoading, toLogout} from '../actions/actions';
import {toShow, toHide} from '../actions/actions';

import Login from '../login/login';
import Thankyou from '../thankyou/thankyou';
import PrivateRoute from './PrivateRoute';
import NoMatch from '../noMatch/noMatch';

class RouterIndex extends Component {
    constructor(props) {
        super(props);
    }

    // onLoginClick(data) {     const {dispatch} = this.props.store;     let result
    // = false;     callLogin(data).then((data) => {         if(!!data.success){
    //         dispatch(toLogin());             result = true;         }else{
    //      dispatch(toLogout());             result = false;         }     });
    // return result; }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <Switch>
                        <Login
                            exact
                            path="/"
                            result={this.props.result}
                            onLoginClick={this.props.onLoginClick}
                            showOrHide={this.props.showOrHide}/>
                        <PrivateRoute exact path="/thankyou" component={Thankyou} loginStatus={this.props.loginStatus}/>

                        <Route path='*' component={NoMatch}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

RouterIndex.propTypes = {
    store: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        result: state.componentsStatus.isShow,
        loginStatus: state.userStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showOrHide: () => {
            console.log('this is dispatch function!!!');
            dispatch(toShow());
        },
        onLoginClick: (data, history) => {
            console.log(history);
            dispatch(toLoading(data, history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterIndex);