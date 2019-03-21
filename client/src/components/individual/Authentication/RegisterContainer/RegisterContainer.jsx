import React, { Component } from 'react';

import Register from './Register/Register';
import {notificationError} from '../../../shared/constants';

class RegisterContainer extends Component {
    constructor(props) {
      
        super(props);
        this.state = {
        };
        this._toLogin = this._toLogin.bind(this);
        this._onRegisterForm = this._onRegisterForm.bind(this);
        this._sendUserInformation = this._sendUserInformation.bind(this);
        this._validatePasswordForm = this._validatePasswordForm.bind(this);
    }

    componentWillMount() {
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
  
    _onRegisterForm() {
        if(this._validatePasswordForm()) {
            let userInformation = {
                firstName: this.child.firstName.getValue(),
                lastName: this.child.lastName.getValue(),
                email: this.child.email.getValue(),
                password: this.child.password.getValue(),
                fullName: `${this.child.firstName.getValue()} ${this.child.lastName.getValue()}`
            };
            this._sendUserInformation(userInformation);
        }  
    }

    _sendUserInformation(data) {
        fetch('http://localhost:3001/api/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
                    console.log("success");
				})
			} else {
				response.json().then((data) => {
					notificationError(data.message);
				});
            }
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
                />
            </div>
        );
    }

}

export default RegisterContainer;