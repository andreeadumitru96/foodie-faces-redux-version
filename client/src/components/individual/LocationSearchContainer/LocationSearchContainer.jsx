import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocationsByCity } from '../../../reducers/locationReducer/index';
import LocationSearch from './LocationSearch/LocationSearch';

class LocationSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <LocationSearch
                    locationsList = {this.props.locationsList}
                    city = {this.props.cityData}
                    triggeredBody = {this.props.triggeredBody}
                    onFilterLocationsReceived = {this._onFilterLocationsReceived}
                />
            </div>
        );
    }

    componentWillMount() {
        // this.forceUpdate();
    }

    componentDidMount() {
        this.props.fetchLocationsByCity();
    }

    componentWillReceiveProps(newProps) {
        if(this.props.selectedCity && newProps.selectedCity && this.props.selectedCity.cityName !== newProps.selectedCity.cityName) {
            this.props.fetchLocationsByCity();
        }
    }

}

const mapStateToProps = (state) => ({
    locationsList: state.locations.locationsList,
    selectedCity: state.locations.selectedCity
});
  
export default connect(mapStateToProps, { fetchLocationsByCity })(LocationSearchContainer);