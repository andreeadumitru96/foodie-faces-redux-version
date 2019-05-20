import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { Redirect } from 'react-router';

import './AvatarMenu.css';

class AvatarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarLetter: props.avatarName,
            isMyAccountClicked: false,
            isGoogleSearchClicked: false
        }
        this._onMyAccountComponent = this._onMyAccountComponent.bind(this);
        this._onGoogleSearchFoodComponent = this._onGoogleSearchFoodComponent.bind(this);
    }

    render() {
        // if (this.state.isMyAccountClicked) {
        //     return <Redirect push to="/myaccount" />;
        // }
        return (
            <div>
                <IconMenu
                    className="avatar-menu"
                    iconButtonElement={
                        <IconButton>
                            <Avatar className="avatar-menu__letters"> {this.props.avatarName} </Avatar>
                        </IconButton>
                    }
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    targetOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <MenuItem primaryText="My account" onClick={this._onMyAccountComponent}/>
                    <MenuItem primaryText="Search food" onClick={this._onGoogleSearchFoodComponent}/>
                    <MenuItem primaryText="Sign Out" onClick={this.props.onSignOut}/>
                    <div className="avatar-menu__redirect-myaccount">
                        {this.state.isMyAccountClicked ?
                            <Redirect push to="/myaccount"/>
                        :
                            null
                        }
                    </div>
                    <div className="avatar-menu__redirect-google-search">
                        {this.state.isGoogleSearchClicked ?
                            <Redirect push to="/search-food"/>
                        :
                            null
                        }
                    </div>
                    
                    
                </IconMenu>
            </div>
        );
    }

    _onMyAccountComponent = () => {
        
        this.setState({
            isMyAccountClicked: true
        });
    }

    _onGoogleSearchFoodComponent = () => {
        this.setState({
            isGoogleSearchClicked: true
        });
    }
}

export default AvatarMenu;