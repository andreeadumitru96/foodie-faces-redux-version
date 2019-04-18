import React, {Component} from 'react';
import { connect } from 'react-redux';

import LocationTileList from '../LocationTileListContainer/LocationTileList/LocationTileList';

import { fetchLocationsByCity } from '../../../reducers/locationReducer/index.js';
import { fetchMostRatedLocations } from '../../../reducers/locationReducer/index.js';

const numberOfPassedLocations = 9;

class LocationTileListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // locationsList: [],
           
            passedLocations: [],
            lastPassedLocationsIndex: 0,
			isDataLeftToRender: true,
        };
        this._onScrollEnd = this._onScrollEnd.bind(this);
    }

    render() {
        return (
            <LocationTileList 
                locationsTypeFlag = {this.props.locationsTypeFlag}
                passedLocations = {this.state.passedLocations}
                triggeredBody = {this.props.triggeredBody}
                onScrollEnd = {this._onScrollEnd}
                hasMore = {this.state.isDataLeftToRender}
                handleHoverTriggered = {this.props.handleHoverTriggered}
                isSiblingRendered = {this.props.isSiblingRendered}
            />
        );

    }

    componentDidMount() {
        if(this.props.locationsTypeFlag === 'MostRatedLocationsComponent') {
            this.props.fetchMostRatedLocations();
        } else if(this.props.locationsTypeFlag === 'LocationSearchComponent') {
            this.props.fetchLocationsByCity();
        }
        
    }

    _onScrollEnd() {
		let passedLocations = this.props.locationsList.slice(this.state.lastPassedLocationsIndex, this.state.lastPassedLocationsIndex + numberOfPassedLocations);
		let isDataLeftInArray = true;
		
		if(passedLocations.length < numberOfPassedLocations) {
			isDataLeftInArray = false;
		}

		this.setState({
			lastPassedLocationsIndex: this.state.lastPassedLocationsIndex + numberOfPassedLocations,
			passedLocations: this.state.passedLocations.concat(passedLocations),
			isDataLeftToRender: isDataLeftInArray
		});
    }
    
    componentWillReceiveProps(newProps) {

        if (this.props.locationsList !== newProps.locationsList) {
			this.setState({
				// locationsList: newProps.locationsList,
				passedLocations: [],
				lastPassedLocationsIndex: 0,
				isDataLeftToRender: true
			}, () => {
				this._onScrollEnd();
			});
		}
    }
    
}
const mapStateToProps = (state) => ({

    locationsList: state.locations.locationsList
});

export default connect(mapStateToProps, { fetchMostRatedLocations, fetchLocationsByCity })(LocationTileListContainer);