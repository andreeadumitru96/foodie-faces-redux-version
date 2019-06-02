import React, { Component } from 'react';
import { connect } from 'react-redux';

import {cookies} from '../../../shared/constants';

import Login from './Login/Login'
import { loginUser }  from '../../../../reducers/userReducer/index';
import { notificationError } from '../../../shared/constants';
import LocationAdministrator from '../../LocationAdministrator/LocationAdministrator';
import HomeContainer from '../../HomeContainer/HomeContainer';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocationAdmin: null,
            componentToRender: null

        };
        this._onLogin = this._onLogin.bind(this);
        this._toRegister = this._toRegister.bind(this);
        this._toHomePage = this._toHomePage.bind(this);
        this._onEnterPressed = this._onEnterPressed.bind(this);
        this._checkUserRole = this._checkUserRole.bind(this);
    }

    _toRegister() {

        this.props.history.push('/register');  
    }

    _toHomePage(data) {
        this.props.onLogin(data);
        this._checkUserRole();
        
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
        this.props.loginUser(userCredentials).then(() => {
            

            this._toHomePage(this.props.userDetails);

        }).catch((error) => {
            notificationError(error);
        });

    }

    _onEnterPressed(ev) {
        if (ev.key === 'Enter') {
            this._onLogin();
        }
    }

    _checkUserRole() {

        // console.log(cookies.get('user'));
        this.setState({
            isLocationAdmin: cookies.get('user').role === 'locationAdmin' ? true : false
        }, () => {
            let componentToRender;
            if(this.state.isLocationAdmin) {
                componentToRender = LocationAdministrator;
            } else {
                componentToRender = HomeContainer;
            }
            this.props.updateComponentToRender(componentToRender);
        });

        
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

export default connect(mapStateToProps, { loginUser })(LoginContainer);