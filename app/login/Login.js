import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router-dom';

import Store from '../store/store';
// import {toLogin, toLoading, toLogout} from '../actions/actions'; import
// {LOGIN, LOGOUT, LOADING} from '../actions/actions'; import {callLogin} from
// '../core/DataService'; css
import styles from './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.login = this
            .login
            .bind(this);
        this.handleUsername = this
            .handleUsername
            .bind(this);
        this.handlePassword = this
            .handlePassword
            .bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    login() {
        // Store.dispatch(toLoading()); let result = callLogin(this.state);
        // console.log(result); result.then((data) => {     if(data.success == 1){
        // Store.dispatch(toLogin());         this.setState({             isLogin:
        // result,         });     } else {         Store.dispatch(toLogout());     }
        // }); this.props.onLoginClick(this.state);

        let result = this
            .props
            .onLoginClick(this.state, this.props.history);
    }

    render() {
        return (
            <div className={styles.loginBody + ' row'}>
                <div className='row'>
                    <div className='form-group col-md-4'>
                        <label htmlFor='username'>
                            Username:
                        </label>
                        <input
                            className="form-control"
                            id='username'
                            type='text'
                            value={this.state.username}
                            onChange={this.handleUsername}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col-md-4'>
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input
                            className="form-control"
                            id='password'
                            type='password'
                            value={this.state.password}
                            onChange={this.handlePassword}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {this.props.result
                            ? <button className='btn btn-primary' onClick={this.login}>Log in</button>
                            : <button className='btn btn-primary' onClick={this.props.showOrHide}>Show / Hide</button>}
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    result: PropTypes.bool.isRequired,
    showOrHide: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired
}

export default withRouter(Login);