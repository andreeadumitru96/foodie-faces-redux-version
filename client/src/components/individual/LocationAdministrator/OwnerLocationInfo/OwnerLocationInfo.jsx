import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import ReactStars from 'react-stars'
import { GridList } from 'material-ui/GridList';
import { GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import socketIOClient from "socket.io-client";



import { API_URL } from '../../../shared/constants';
import { API_PORT_URL, HOST_URL } from '../../../shared/constants'

import { fetchLocationById } from '../../../../reducers/locationReducer/index';
import '../OwnerLocationInfo/OwnerLocationInfo.css';


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
 

class OwnerLocationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableSeats: null
        };
        this.onUpdateSeatsSocketSend = this.onUpdateSeatsSocketSend.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = event => {
        console.log(event.target.value);
        this.setState({
            availableSeats: event.target.value
        });
    };

    render() {
    
        return (
            <div>
                {this.props.locationDetails ? 
                    <div>
                        
                        <div className="location-details-header__title-container">
                            <div className="title-container__name">
                                {this.props.locationDetails.name}
                            </div>
                            <div className="title-container__rating">
                                <ReactStars
                                    count={5}
                                    size={18}
                                    color2={'black'}
                                    half={false}
                                    edit={false}
                                    value={this.props.locationDetails.tripAdvisorRating}
                                />
                            </div>
                        </div>

                        <div className="information__general-admin location-item-padding">
                            {
                                this.props.locationDetails.address
                                    ?
                                    <div className="information-address information-item">
                                        <i className="fa fa-map-marker"> Address: </i>
                                        <span className="information-address-span main-information-details">
                                            {this.props.locationDetails.address}
                                        </span>
                                    </div>
                                    : null
                            }
                            {
                                this.props.locationDetails.phone
                                    ?
                                    <div className="information-phone information-item">
                                        <i className="fa fa-phone"> Phone Number: </i>
                                        <span className="information-phone-span main-information-details">
                                            {this.props.locationDetails.phone[0]}
                                        </span>
                                    </div>
                                    : null
                            }
                            {
                                this.props.locationDetails.price
                                    ?
                                    <div className="information-average-price information-item">
                                        <i className="fa fa-money"> Price Range: </i>
                                        <span className="information-average-price-span main-information-details">
                                            {this.props.locationDetails.price}
                                        </span>
                                    </div>
                                    : null
                            }
                            {
                                this.props.locationDetails.availableSeats
                                    ?
                                    <div className="information-average-price information-item">
                                        <i class="fas fa-chair"> Available Seats: </i>
                                        <span className="information-average-price-span main-information-details">
                                            {this.props.locationDetails.availableSeats}
                                        </span>
                                    </div>
                                    : null
                            }
                            
                        </div>
                        <div className="owner-location-images location-item-padding">
                        {this.props.locationDetails.images ? 
                            <div>
                        
                                <p class="owner-location-info-title">Images</p>
                                {
                                    this.props.locationDetails.images.length > 0
                                        ?
                                        <div style={styles.root} className="location-details-grid">
                                            <GridList
                                                cols={2}
                                                cellHeight={200}
                                                padding={1}
                                                style={styles.gridList}
                                            >
                                                {this.props.locationDetails.images.map((image, index) => (

                                                    <GridTile key={image} cols={index % 3 === 0 ? 2 : 1} rows={index % 3 === 0 ? 2 : 1}>
                                                        <img src={image} alt=""/>
                                                    </GridTile>
                                                ))}
                                            </GridList>
                                        </div>
                                        : <p class="location-item-no-description">There are no images yet</p>
                                }
                            </div>
                            : 
                            null
                        }
                        </div>
                        
                        {/* <div className="owner-location-reviews location-item-padding">
                            <p class="owner-location-info-title">Reviews</p>
                            {
                                this.props.locationDetails.reviews.length > 0
                                    ?
                                    <div style={styles.root} className="location-details-grid">
                                        <GridList
                                            cols={2}
                                            cellHeight={200}
                                            padding={1}
                                            style={styles.gridList}
                                        >
                                            {this.props.locationDetails.images.map((image, index) => (

                                                <GridTile key={image} cols={index % 3 === 0 ? 2 : 1} rows={index % 3 === 0 ? 2 : 1}>
                                                    <img src={image} onClick={() => this._onClickFullSizeImage(image)} />
                                                </GridTile>
                                            ))}
                                        </GridList>
                                    </div>
                                    : <p class="location-item-no-description">There are no reviews yet</p>
                            }
                        </div> */}
                            
                        <div className="modify-seats-wrapper location-item-padding">
                            <div className="modify-seats-input">
                                <p className="owner-location-info-title">Modify seats</p>
                                <TextField
                                    id="outlined-number"
                                    label="Number"
                                    onChange={this.handleOnChange}
                                    type="number"
                                    // value={this.props.availableSeats ? this.props.availableSeats : 0}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                    
                            <div className="modify-seats-button">
                                <RaisedButton label="Update seats" onClick={this.onUpdateSeatsSocketSend}/>
                            </div>
                        </div>
                       
                    </div>
                :
                    null
                }
               

                
                
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchLocationById(this.props.selectedLocationId);
    }

    onUpdateSeatsSocketSend = () => {
        const socket = socketIOClient(`http://${HOST_URL}:${API_PORT_URL}`);

        let locationToUpdate = {
            locationId: this.props.locationDetails._id,
            availableSeats: this.state.availableSeats
        }

        socket.emit('onUpdateSeatsEvent', locationToUpdate);    
    }    

}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails,
});

  
export default connect ( mapStateToProps, { fetchLocationById }) (OwnerLocationInfo);