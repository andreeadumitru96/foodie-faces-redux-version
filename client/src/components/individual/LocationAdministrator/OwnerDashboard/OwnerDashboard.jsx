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
            <div className="owner-dashboard-wrapper">
                <ChooseLocationDropdown
                    goToOwnerLocationInfoComponent={this.props.goToOwnerLocationInfoComponent}
                />
            </div>
        );
    }


}

  
export default OwnerDashboard;