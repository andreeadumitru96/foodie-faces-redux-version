import React, { Component } from 'react';
import { GridList } from 'material-ui/GridList';
import { GridTile } from 'material-ui/GridList';

import './LocationDetailsGrid.css';
import FullSizeImage from './FullSizeImage/FullSizeImage';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '500px',
        height: '400px',
        overflowY: 'auto'
    },
};

class LocationDetailsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullSizeImageOpen: false,
            imageToView: null
        };

        this._onClickFullSizeImage = this._onClickFullSizeImage.bind(this);
        this._triggerWindowClose = this._triggerWindowClose.bind(this);
    }

    render() {
        return (
            <div style={styles.root} className="location-details-grid">
                <GridList
                    cols={2}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}
                >
                    {this.props.locationDetails.images.map((image, index) => (
                        // <div className="location-details-grid_image" key={image}>
                        //     <img src={image} alt="" onClick={this._onClickFullSizeImage} />
                        //     <div className="image-full-size">
                        //         {this.state.isFullSizeImageOpen ?
                        //             <FullSizeImage
                        //                 image={image}
                        //                 isFullSizeImageOpen={this.state.isFullSizeImageOpen}
                        //                 triggerWindowClose={this._triggerWindowClose}
                        //             />
                        //             :
                        //             null
                        //         }
                        //     </div>
                        // </div>
                        <GridTile key={image} cols={index % 3 === 0 ? 2 : 1} rows={index % 3 === 0 ? 2 : 1}>
                            <img src={image} onClick={() => this._onClickFullSizeImage(image)}/>
                        </GridTile>
                    ))}
                </GridList>
                <div className="image-full-size">
                    {this.state.isFullSizeImageOpen ?
                        <FullSizeImage
                            image={this.state.imageToView}
                            isFullSizeImageOpen={this.state.isFullSizeImageOpen}
                            triggerWindowClose={this._triggerWindowClose}
                        />
                        :
                        null
                    }
                </div>
            </div>
        );
    }

    _onClickFullSizeImage(image) {
        this.setState({
            isFullSizeImageOpen: !this.state.isFullSizeImageOpen,
            imageToView: image
        })
    }

    _triggerWindowClose() {
        this.setState({
            isFullSizeImageOpen: false
        })
    }

}

export default LocationDetailsGrid;