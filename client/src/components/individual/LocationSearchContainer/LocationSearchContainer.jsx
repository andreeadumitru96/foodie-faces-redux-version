import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLocationsByCity } from '../../../reducers/locationReducer/index';
import LocationSearch from './LocationSearch/LocationSearch';

class LocationSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // locationsList: this.props.locationsList
        };
        this._onFilterLocationsReceived = this._onFilterLocationsReceived.bind(this);

    }

    render() {
        return (
            <div>
                <LocationSearch
                    locationsList={this.props.locationsList}
                    city={this.props.cityData}
                    triggeredBody={this.props.triggeredBody}
                    onFilterLocationsReceived={this._onFilterLocationsReceived}
                />
            </div>
        );
    }

    componentWillMount() {
        this.forceUpdate();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            locationsList: newProps.locationsList
        })
    }

    _onFilterLocationsReceived(filteredLocations) {
        this.setState({
            locationsList: filteredLocations
        })
    }

    componentDidMount() {
        this.props.fetchLocationsByCity();
        
    }

}

const mapStateToProps = (state) => ({
    locationsList: state.locations.locationsList,
});
  
export default connect(mapStateToProps, { fetchLocationsByCity })(LocationSearchContainer);