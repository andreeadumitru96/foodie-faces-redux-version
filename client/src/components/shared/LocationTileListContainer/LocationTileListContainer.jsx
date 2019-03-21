import React, {Component} from 'react';

import LocationTileList from '../LocationTileListContainer/LocationTileList/LocationTileList';

const numberOfPassedLocations = 9;

class LocationTileListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsList: this.props.locationsList,
            passedLocations: [],
            lastPassedLocationsIndex: 0,
			isDataLeftToRender: true,
        };
        this._onScrollEnd = this._onScrollEnd.bind(this);
    }


    render() {
        return (
            <LocationTileList 
                passedLocations = {this.state.passedLocations}
                triggeredBody = {this.props.triggeredBody}
                onScrollEnd={this._onScrollEnd}
                hasMore={this.state.isDataLeftToRender}
                handleHoverTriggered={this.props.handleHoverTriggered}
                isSiblingRendered={this.props.isSiblingRendered}
            />
        );

    }

    _onScrollEnd() {
		let passedLocations = this.state.locationsList.slice(this.state.lastPassedLocationsIndex, this.state.lastPassedLocationsIndex + numberOfPassedLocations);
		let isDataLeftInArray = true;
		
		if(passedLocations.length < numberOfPassedLocations) {
			isDataLeftInArray = false;
		}

		this.setState({
			lastPassedLocationsIndex: this.state.lastPassedLocationsIndex + numberOfPassedLocations,
			passedLocations: this.state.passedLocations.concat(passedLocations),
			isDataLeftToRender: isDataLeftInArray
		})
    }
    
    componentWillReceiveProps(newProps) {

        if (this.state.locationsList !== newProps.locationsList) {
			this.setState({
				locationsList: newProps.locationsList,
				passedLocations: [],
				lastPassedLocationsIndex: 0,
				isDataLeftToRender: true
			}, () => {
				this._onScrollEnd();
			});
		}
    }
    
}

export default LocationTileListContainer;