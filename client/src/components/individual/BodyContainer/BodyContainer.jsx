import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchLocationsByCity } from '../../../reducers/postReducer/index';
// import Body from '../BodyContainer/Body/Body';
import MostRatedLocationsContainer from '../MostRatedLocationsContainer/MostRatedLocationsContainer';
import LocationSearchContainer from '../LocationSearchContainer/LocationSearchContainer';
import LocationDetailsContainer from '../../shared/LocationDetailsContainer/LocationDetailsContainer';

import './Body.css';

class BodyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMostRatedLocationsMount: this.props.componentToMount === 'MostRatedLocationsComponent' ? true : false,
            isLocationSearchMount: this.props.componentToMount === 'LocationSearchComponent' ? true : false,
            isLocationDetailsMount: this.props.componentToMount === 'LocationDetailsComponent' ? true : false,
            // receivedLocationsFromHeader: [],
            locationDetails: null
        };
        this._triggeredBody = this._triggeredBody.bind(this);
    }

    render() {
        return(
            <div className="body-container">
                {this.state.isMostRatedLocationsMount ? 
                    <MostRatedLocationsContainer
                        triggeredBody = {this._triggeredBody}
                    />
                    : null}
                {this.state.isLocationSearchMount ? 
                    <LocationSearchContainer
                        triggeredBody = {this._triggeredBody}
                    /> 
                    : null
                }
                {this.state.isLocationDetailsMount ? 
                    <LocationDetailsContainer
                        locationDetails = {this.state.locationDetails}
                        triggeredBody = {this._triggeredBody}
                     /> 
                     : null
                }
            </div>
        )
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        if(newProps.urlLocationData !== null) {
            this._triggeredBody(newProps.componentToMount, newProps.urlLocationData);
        }
        this.setState({
            isMostRatedLocationsMount: newProps.componentToMount === 'MostRatedLocationsComponent' ? true : false,
            isLocationSearchMount: newProps.componentToMount === 'LocationSearchComponent' ? true : false,
            isLocationDetailsMount: newProps.componentToMount === 'LocationDetailsComponent' ? true : false,
            // receivedLocationsFromHeader: newProps.receivedLocationsFromHeader
        })
    }

    _triggeredBody(componentToMount, data) {
        this.setState({
            isLocationDetailsMount: componentToMount === 'LocationDetailsComponent' ? true : false,
            isMostRatedLocationsMount: false,
            isLocationSearchMount: false,
            // locationDetails: data
        })
    }
}

const mapStateToProps = (state) => ({
    locationsListByCity: state.posts.locationsListByCity,
});

export default connect(mapStateToProps, { fetchLocationsByCity })(BodyContainer);