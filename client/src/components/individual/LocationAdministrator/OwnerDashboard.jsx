import React, { Component } from 'react';
import ChooseLocationDropdown from './ChooseLocationDropdown';


class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <ChooseLocationDropdown/>
            </div>
        );
    }


}

  
export default OwnerDashboard;