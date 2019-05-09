import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { cookies } from '../../shared/constants';
import { fetchOwnerLocations } from '../../../reducers/userReducer/index';

const styles = {
    customWidth: {
      width: 200,
    },
};

class ChooseLocationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }  
    handleChange = (event, index, value) => this.setState({value});
    
    render() {
        return(
            <div>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                {
                    this.props.ownerLocations.map((location) => {
                        <MenuItem value={location._id} primaryText={location.name} />
                    })
                    
                }
                
                    
                </DropDownMenu>
          </div>
        );

    }

    componentDidMount() {
        let ownerInformation = {
            ownerId: cookies.get('user')._id
        }
        
        this.props.fetchOwnerLocations(ownerInformation);
    }
}

const mapStateToProps = (state) => ({
    ownerLocations: state.users.ownerLocations
});

export default connect (mapStateToProps, { fetchOwnerLocations }) (ChooseLocationDropdown);