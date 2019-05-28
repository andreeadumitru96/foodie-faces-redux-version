import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';

import AvatarMenuContainer from '../AvatarMenuContainer/AvatarMenuContainer';
import logoImg from '../../../../assets/logo.jpg';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this._goToHomePage = this._goToHomePage.bind(this);
    }

    componentWillMount() {

    }
    render() {
        return (
            <div className="header">
                <div className="header__appbar">
                    {this.props.isMyAccountMount ?
                        <AppBar
                            iconElementRight={<AvatarMenuContainer/>}
                            iconElementLeft={
                                <AutoComplete
                                    hintText="Find a location..."
                                    dataSource={this.props.wishListFormattedByName}
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    onNewRequest = {this.props.onSelectLocation}                               
                                    className="appbar-autocomplete-locations"          
                                />
                            }             
                        />
                    :
                        null
                    }
                    {this.props.isLocationSearchMount ?         
                        <AppBar
                            iconElementRight={<AvatarMenuContainer/>}
                            iconElementLeft={
                                <AutoComplete
                                    hintText="Choose a city..."
                                    dataSource={this.props.citiesList}
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    onNewRequest = {this.props.onSelectCity}                               
                                    className="appbar-autocomplete-cities"          
                                />
                            }          
                        />
                    :
                        null
                    }
                    {this.props.isGoogleSearchMount ?         
                        <AppBar
                            iconElementRight={<AvatarMenuContainer/>}
                            iconElementLeft={
                                <div> </div>
                            }          
                        />
                    :
                        null
                    }
                </div>  

                <div className="header__logo">
                    <img src={logoImg} alt="" className="logo-img" onClick={this._goToHomePage}/>
                </div>
            </div>
            
        );
    }
    componentWillReceiveProps() {
		this.forceUpdate();
    }
    
    _goToHomePage() {
        window.location = '/';
    }
}

export default Header;