import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchMostRatedLocations } from '../../../reducers/locationReducer/index';
import MostRatedLocations from './MostRatedLocations/MostRatedLocations';

// import {notificationError} from '../../shared/constants';

class MostRatedLocationsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.fetchMostRatedLocations();
    }

    render() {
        return(
            <div>
                <MostRatedLocations 
                    locationsList = {this.props.mostRatedLocationsList}
                    triggeredBody = {this.props.triggeredBody}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    mostRatedLocationsList: state.locations.mostRatedLocationsList,
});
  
export default connect(mapStateToProps, { fetchMostRatedLocations })(MostRatedLocationsContainer);