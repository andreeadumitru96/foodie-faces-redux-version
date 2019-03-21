import React, { Component } from 'react';
import LocationTileItemContainer from '../../LocationTileItemContainer/LocationTileItemContainer';
import GridList from 'material-ui/GridList';
import InfiniteScroll from 'react-infinite-scroller';

import './LocationTileList.css';

const styles = {
    gridList: {
        height: 'auto'
    },
};

class LocationTileList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="location-tile-list">
            	<InfiniteScroll
					pageStart={0}
					loadMore={this.props.onScrollEnd}
					hasMore={this.props.hasMore}
				>
                <GridList
                    cellHeight={300}
                    cols={3}
                    padding={10}
                    style={styles.gridList}
                    >
                    {this.props.passedLocations.map(location => (
                        <LocationTileItemContainer 
                            locationData = {location} key = {location._id}
                            triggeredBody = {this.props.triggeredBody}
                            handleHoverTriggered = {this.props.handleHoverTriggered}
                            isSiblingRendered = {this.props.isSiblingRendered}
                        />
                    ))}
                </GridList>
                </InfiniteScroll>
            </div>
        );
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

}

export default LocationTileList;