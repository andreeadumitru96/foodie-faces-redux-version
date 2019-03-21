import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="login">
                <form className="login__form">
                    <div className="login__form-p">
                        <p>LOG IN</p>
                    </div>
                    <div className="login__form-email">
                        <TextField  
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="Email"
                            autoComplete = "new-password"
                            onKeyPress={this.props.onEnterPressed}
                            ref={(inputValue) => {this.email = inputValue}}
                        />  
                    </div>

                    <div className="login__from-password">
                        <TextField
                            inputStyle={{color: 'white'}}
                            floatingLabelStyle={{color: 'white'}}
                            floatingLabelText="Password"
                            type="password"
                            autoComplete = "new-password"
                            onKeyPress={this.props.onEnterPressed}
                            ref={(inputValue) => {this.password = inputValue}}
                        />
                    </div>

                    <div className="login__form-sign-in-button">
                        <RaisedButton label="LOG IN"
                            onClick={this.props.onLogin}
                        />
                    </div>

                    <div className="login__form-forgot-password">
                        <a className="login__form-forgot-password-anchor"> Forgot your password? </a>
                    </div>  
                    <div className="login__redirect-register">
                        <p className="login__redirect-register-text"onClick={this.props.toRegister}> Don't you have an account? Register here </p>     
                    </div>       
                    
                </form>
            </div>
        );
    }
}

export default Login;