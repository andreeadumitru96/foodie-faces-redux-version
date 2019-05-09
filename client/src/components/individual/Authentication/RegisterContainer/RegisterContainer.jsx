import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../../../reducers/userReducer/index';
import Register from './Register/Register';
import { notificationError, successNotification } from '../../../shared/constants';

class RegisterContainer extends Component {
    constructor(props) {
      
        super(props);
        this.state = {
            userRole: null
        };
        this._toLogin = this._toLogin.bind(this);
        this._onRegisterForm = this._onRegisterForm.bind(this);
        this._sendUserInformation = this._sendUserInformation.bind(this);
        this._validatePasswordForm = this._validatePasswordForm.bind(this);
        this._onHandleRadioGroupChange = this._onHandleRadioGroupChange.bind(this);
    }

    _toLogin() {
        this.props.history.push('/login');
    }

    _validatePasswordForm () {
        if(this.child.password.getValue() !== this.child.repeatPassword.getValue()) {
            notificationError('Passwords does not match.')
            return false;
        }
        return true;
    }

    _onHandleRadioGroupChange(value) {
        this.setState({
            userRole: value
        })
    }
  
    _onRegisterForm() {
        if(this._validatePasswordForm()) {
            let userInformation = {
                firstName: this.child.firstName.getValue(),
                lastName: this.child.lastName.getValue(),
                email: this.child.email.getValue(),
                password: this.child.password.getValue(),
                fullName: `${this.child.firstName.getValue()} ${this.child.lastName.getValue()}`,
                role: this.state.userRole
            };
            this._sendUserInformation(userInformation);
        }  
    }

    _sendUserInformation(data) {
        this.props.registerUser(data).then(() => {
            successNotification('You have been successfully registered');
            this._toLogin();
        }).catch((error) => {
            notificationError(error);
        });
    }

    render() {
        return (
            <div>
                <Register
                    toLogin={this._toLogin}
                    sendUserInformation={this._sendUserInformation}
                    onRegisterForm={this._onRegisterForm}
                    ref={(childInstance) => { this.child = childInstance; }}
                    handleChange = {this._onHandleRadioGroupChange}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, { registerUser })(RegisterContainer);