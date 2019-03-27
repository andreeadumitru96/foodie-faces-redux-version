import React, { Component } from 'react';
import { connect } from 'react-redux';


import LocationDetails from './LocationDetails/LocationDetails';
import { fetchLocationById }  from '../../../reducers/locationReducer/index';


class LocationDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.locationDetails ?
                    <LocationDetails
                        locationDetails = {this.props.locationDetails}
                        triggeredBody = {this.props.triggeredBody}
                    />
                :
                    null   
                }
             </div>
            

        );
    }

    componentDidMount() {
        this.props.fetchLocationById(this.props.locationId);
        window.scrollTo(0,0);
    }

    componentWillReceiveProps() {
        window.scrollTo(0,0);
    }
    
}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails,
});

export default connect(mapStateToProps, { fetchLocationById })(LocationDetailsContainer);