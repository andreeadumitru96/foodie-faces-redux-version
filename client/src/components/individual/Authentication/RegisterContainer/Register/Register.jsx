import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import './Register.css';

const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
};


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
                    <div className="register__form-repeat-password">
                        <RadioButtonGroup 
                            name="roleRadio" 
                            defaultSelected="not_light"
                            onChange={(event, value) => {this.props.handleChange(value)}}
                        >
                                <RadioButton
                                    value="locationAdmin"
                                    label="Location Administrator"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="foodLover"
                                    label="Food Lover"
                                    checkedIcon={<ActionFavorite style={{ color: 'white' }} />}
                                    uncheckedIcon={<ActionFavoriteBorder />}
                                    style={styles.radioButton}
                                />
                        </RadioButtonGroup>
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