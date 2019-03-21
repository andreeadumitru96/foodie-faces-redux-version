import React, { Component } from 'react';

import AvatarMenu from './AvatarMenu/AvatarMenu';
import { cookies } from '../../../shared/constants';

class AvatarMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: cookies.get('user')
        }
        this._onSignOut = this._onSignOut.bind(this);
    }

    render() {
        return (
            <div>
                <AvatarMenu
                    avatarName = {this.state.userData.firstName.substring(0, 1)}
                    onSignOut = {this._onSignOut}
                />

            </div>
        );
    }

    _onSignOut() {
        cookies.remove('user');
        window.location.reload(); 
    }
}

export default AvatarMenuContainer;