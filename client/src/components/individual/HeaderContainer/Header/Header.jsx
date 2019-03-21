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
        this._reloadPage = this._reloadPage.bind(this);
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
                    }
                </div>  

                <div className="header__logo">
                    <img src={logoImg} alt="" className="logo-img" onClick={this._reloadPage}/>
                </div>
            </div>
            
        );
    }
    componentWillReceiveProps() {
		this.forceUpdate();
    }
    
    _reloadPage() {
        window.location.reload()
    }
}

export default Header;