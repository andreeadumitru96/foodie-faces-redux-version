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
            isMyAccountClicked: false
        }
        this._onMyAccountComponent = this._onMyAccountComponent.bind(this);
    }

    render() {
        // if (this.state.isMyAccountClicked) {
        //     return <Redirect push to="/myaccount" />;
        // }
        return (
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
                <MenuItem primaryText="Sign Out" onClick={this.props.onSignOut}/>
                <div className="avatar-menu__redirect-myaccount">
                    {this.state.isMyAccountClicked ?
                        <Redirect push to="/myaccount"/>
                    :
                        null
                    }
                </div>
                
                
            </IconMenu>

        );
    }

    _onMyAccountComponent = () => {
        
        this.setState({
            isMyAccountClicked: true
        });
    }
}

export default AvatarMenu;