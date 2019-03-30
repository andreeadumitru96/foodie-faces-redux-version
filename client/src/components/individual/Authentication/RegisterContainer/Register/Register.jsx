import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="register">
                <form className="register__form">
                    <div className="register__form-p">
                        <p>Discover your tastes</p>
                    </div>

                    <div className="register__form-first-name">
                        <TextField
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="First Name"
                            autoComplete = "new-password"
                            ref={(inputValue) => {this.firstName = inputValue}}
                        />  
                    </div>

                    <div className="register__form-last-name">
                        <TextField
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="Last Name"
                            autoComplete = "new-password"
                            ref={(inputValue) => {this.lastName = inputValue}}
                        />
                    </div>

                    <div className="register__form-email">
                        <TextField
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="Email"
                            autoComplete = "new-password"
                            ref={(inputValue) => {this.email = inputValue}}
                        />
                    </div>

                    <div className="register__form-password">
                        <TextField
                            inputStyle={{color: 'white'}}
                            type="password"
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="Password"
                            autoComplete = "new-password"
                            ref={(inputValue) => {this.password = inputValue}}
                        />
                    </div>

                    <div className="register__form-repeat-password">
                        <TextField
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            type="password"
                            floatingLabelText="Repeat Password"
                            autoComplete = "new-password"
                            ref={(inputValue) => {this.repeatPassword = inputValue}}
                        />
                    </div>

                    <div className="register__form-sign-up-button">
                        <RaisedButton label="SIGN UP" onClick={this.props.onRegisterForm}/>
                    </div>

                    <div className="register__form-forgot-password">
                        <a className="register__form-forgot-password-anchor" onClick={this.props.toLogin}> I already have an account </a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;