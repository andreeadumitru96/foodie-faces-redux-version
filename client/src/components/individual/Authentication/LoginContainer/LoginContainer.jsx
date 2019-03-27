import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login/Login'
import { userLogin }  from '../../../../reducers/userReducer/index';
import { notificationError } from '../../../shared/constants';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this._onLogin = this._onLogin.bind(this);
        this._toRegister = this._toRegister.bind(this);
        this._toHomePage = this._toHomePage.bind(this);
        this._onEnterPressed = this._onEnterPressed.bind(this);
    }

    _toRegister() {

        this.props.history.push('/register');  
    }

    _toHomePage(data) {
        this.props.onLogin(data);
        this.props.history.push('/');
    }

    _onLogin() {
        let userCredentials = {
            email: this.child.email.getValue(),
            password: this.child.password.getValue()
        }
        this._sendUserCredentials(userCredentials);
    }

    _sendUserCredentials(userCredentials) {
        this.props.userLogin(userCredentials);
        console.log(this.props.userDetails);
        this._toHomePage(this.props.userDetails);

    }

    _onEnterPressed(ev) {
        if (ev.key === 'Enter') {
            this._onLogin();
        }
    }

    render() {
        return (
            <Login
                onLogin = {this._onLogin}
                toRegister = {this._toRegister}
                onEnterPressed = {this._onEnterPressed}
                ref={(childInstance) => { this.child = childInstance; }}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.users.userDetails
});

export default connect(mapStateToProps, { userLogin })(LoginContainer);