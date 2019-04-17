import React, { Component } from 'react';
import { GridList } from 'material-ui';
import { connect } from 'react-redux';

import { fetchSimilarLocations } from '../../../../reducers/locationReducer/index.js';

import { notificationError } from '../../constants';
import LocationTileItemContainer from '../../LocationTileItemContainer/LocationTileItemContainer';
import './LocationDetailsSimilarLocations.css';


const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }
};
  

class LocationDetailsSimilarLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this._getSimilarLocations = this._getSimilarLocations.bind(this);
    }

    render() {
        return (
            <div className="location-details-similars">
                <p className="location-details-similars__title">   
                    Here are some locations you may also like...
                </p>

                <div className="location-details-similars__grid" style={styles.root}>
                    <GridList 
                        style={styles.gridList} 
                        cols={3}
                        className="grid-items"
                    >
                        {this.props.similarLocations.map((location, index) => {
                            return(<LocationTileItemContainer
                                locationId={location._id}
                                key={location._id}
                                triggeredBody = {this.props.triggeredBody}
                            />)
                        })}
                    </GridList>
                </div>
            </div>
        );
    }

    _getSimilarLocations() {

        let locationInfo = {
            filters: {
                meals: this.props.locationDetails.categories.meals.slice(),
                goodFor: this.props.locationDetails.categories.goodFor.slice(),
                cuisine: this.props.locationDetails.categories.cuisine.slice()
            },
            cityLocation: this.props.locationDetails.city
        }
        this.props.fetchSimilarLocations(locationInfo, this.props.locationDetails._id);

        
    }

    componentDidMount() {
        this._getSimilarLocations();    
    }
}

const mapStateToProps = (state) => ({
    similarLocations: state.locations.similarLocations,

});

export default connect(mapStateToProps, { fetchSimilarLocations })(LocationDetailsSimilarLocations);