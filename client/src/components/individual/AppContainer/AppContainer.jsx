import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

// import MemoraeLocationById from '../MemoraeLocationById/MemoraeLocationById'; 
import {cookies} from '../../shared/constants';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import LoginContainer from '../Authentication/LoginContainer/LoginContainer';
import RegisterContainer from '../Authentication/RegisterContainer/RegisterContainer';
import PrivateRoute from '../../shared/PrivateRoute/PrivateRoute';
import HomeContainer from '../HomeContainer/HomeContainer';
import MyAccountContainer from '../MyAccountContainer/MyAccountContainer';
import LocationAdministrator from '../LocationAdministrator/LocationAdministrator';
import GoogleSearchFoodContainer from '../GoogleSearchFoodContainer/GoogleSearchFoodContainer';
// import NotFoundRoute from '../../shared/NotFoundRoute/NotFoundRoute';

import { Provider } from 'react-redux';
import store from '../../../store';


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: cookies.get('user') ? true : false,
            componentToRender: null
            
        }
        this._createUserCookie = this._createUserCookie.bind(this);
        this._changeAuthenticationState = this._changeAuthenticationState.bind(this);
        this._onLogin = this._onLogin.bind(this);
        
    }

    _createUserCookie(userData) {
        cookies.set('user', userData);
    }

    _updateComponentToRender = (componentToRender) => {
        this.setState({
            componentToRender: componentToRender
        });
    }


    _changeAuthenticationState() {
        this.setState({
            authenticated: !this.state.authenticated
        });
    }

    _onLogin(userData) {
        this._changeAuthenticationState();
        this._createUserCookie(userData);
    }

    componentWillMount() {
        let componentToRender;
        if(this.state.authenticated && cookies.get('user').role === 'locationAdmin') {
            componentToRender = LocationAdministrator;
        } else {
            componentToRender = HomeContainer;
        }
        this._updateComponentToRender(componentToRender);
    }


    render() {
        return (
                <div className="app-container-wrapper">
                    <Provider store={store}>
                        <Router>
                            <Switch>
                                <Route exact path='/login' render={(params) => 
                                    <LoginContainer 
                                        onLogin={this._onLogin} 
                                        history={params.history}  
                                        updateComponentToRender={this._updateComponentToRender}
                                      
                                        />}
                                    />
                                <Route exact path='/register' render={(params) => <RegisterContainer history={params.history}/>}/>
                                    
                                <PrivateRoute exact path='/' component={this.state.componentToRender} authenticated={this.state.authenticated} />
                                <PrivateRoute exact path='/myaccount' component={MyAccountContainer} authenticated={this.state.authenticated}/>
                                <PrivateRoute exact path='/search-food' component={GoogleSearchFoodContainer} authenticated={this.state.authenticated}/>      
                                    
                                
                                
                                {/* <Route exact path='/locations/:locationId' render={(params) => <MemoraeLocationById authenticated={this.state.authenticated} {...params}/>}/> */}
                                
                                {/* { <Route component={NotFoundRoute} /> } */}
                            </Switch>
                        </Router>
                    </Provider> 
                    <Alert stack={{limit: 3}} />       
                </div>
        );
    }
}

export default AppContainer;