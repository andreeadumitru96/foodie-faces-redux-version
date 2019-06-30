import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import ReactStars from 'react-stars';
import AutoComplete from 'material-ui/AutoComplete';

import './LocationDetailsAddDish.css';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../../../constants';
import { notificationError } from '../../../constants';
import { addDishInMenu } from '../../../../../reducers/locationReducer/index';
import { fetchLocationById } from '../../../../../reducers/locationReducer/index';


class LocationDetailsAddDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishImagePreview: null,
            dishImageBlob: null,
            uploadedDishImage: null,
            isAddDishOpen: this.props.isAddDishOpen,
            isDishAdded: false,
        };
        this._onAddDishImage = this._onAddDishImage.bind(this);
        this._onAddDish = this._onAddDish.bind(this);
        this._onDishScoreChanged = this._onDishScoreChanged.bind(this);
        this._getDishScore = this._getDishScore.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._onPressAddDish = this._onPressAddDish.bind(this);
        this._formatMenuCategories = this._formatMenuCategories.bind(this);
    }

    render() {
        return (
            <Dialog
                modal={false}
                open={this.props.isAddDishOpen}
                onRequestClose={this._handleClose}
                className="location-details-add-dish-dialog"
            >
                <div className="location-details-add-dish__done">
                    {this.state.isDishAdded ?
                        <div className="done-title">
                            Thank you for the added dish
                        </div>
                        :
                        <div className="location-details-add-dish">
                            <div className="location-details-add-dish__title">
                                What did you eat? Help the community
                            </div>
                            <div className="location-details-add-dish__score">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    color2={'green'}
                                    half={false}
                                    onChange={this._onDishScoreChanged}
                                />
                            </div>

                            <div className="location-details-add-dish__information">
                                <div className="information-dish-name">
                                    <AutoComplete
                                        hintText="Dish name"
                                        dataSource={this._formatMenuDishes()}
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        onUpdateInput={(inputValue) => { this.dishName = inputValue }}                                        
                                    />
                                </div>
                                <div className="information-category">
                                    <AutoComplete
                                        hintText="Category"
                                        dataSource={this._formatMenuCategories()}
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        onUpdateInput={(inputValue) => { this.dishCategory = inputValue }}                                        
                                    />
                                    {/* <TextField
                                        floatingLabelText="Category"
                                        ref={(inputValue) => { this.dishCategory = inputValue }}

                                    /> */}
                                </div>
                                <div className="information-price">
                                    <TextField
                                        floatingLabelText="Price"
                                        ref={(inputValue) => { this.dishPrice = inputValue }}
                                    />
                                </div>
                            </div>

                            <div className="location-details-add-dish__upload">
                                <Dropzone
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this._onAddDishImage}
                                    className="photos-add-photo"
                                >
                                    <i className="fa fa-plus">
                                        Add a photo
                                    </i>
                                </Dropzone>
                            </div>

                            <div className="location-details-add-dish__image-preview">
                                <img src={this.state.dishImagePreview} alt="" />
                            </div>

                            <div className="location-details-add-dish__buttons">
                                <div className="buttons-send">
                                    <RaisedButton label="SEND"
                                        onClick={this._onAddDish}
                                    />
                                </div>

                                <div className="buttons-cancel">
                                    <RaisedButton label="CANCEL"
                                        onClick={this._handleClose}
                                    />
                                </div>
                            </div>
                        </div>         
                    }
                </div>
            </Dialog>
        );
    }

    _onDishScoreChanged(newRating) {
        this.dishScore = newRating;
    }

    _getDishScore() {
        return this.dishScore;
    }

    _onAddDishImage(files) {

        this.setState({
            dishImagePreview: files[0].preview,
            dishImageBlob: files[0]
        })
    }

    _onAddDish() {
        if (!this.state.dishImageBlob) {
            notificationError("Please upload a photo");
        } else if (!this.dishName || !this.dishCategory || !this.dishPrice.getValue()) {
            notificationError("Please complete all the fields");
        } else {
            let file = this.state.dishImageBlob

            let fd = new FormData();
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            fd.append('file', file);

            fetch(CLOUDINARY_UPLOAD_URL, {
                method: 'post',
                body: fd
            })
            .then()
            .then()
            .then((response) => {
                response.json().then((image) => {
                    let newDish = {
                        locationId: this.props.locationDetails._id,
                        name: this.dishName,
                        score: this._getDishScore(),
                        category: this.dishCategory,
                        price: parseFloat(this.dishPrice.getValue()),
                        image: image.secure_url
                    }

                    this.props.addDishInMenu(newDish).then(() => {
                        console.log(this.props.locationDetails);
                        this._onPressAddDish();
                    }).catch(() => {
                        notificationError("It may be a problem when adding a menu dish...");
                    });
                })
            });
           
        }

    }

    _handleClose() {
        this.setState({
            isAddDishOpen: !this.state.isAddDishOpen,
            isDishAdded: false,
            dishImagePreview: null
        });
        this.props.triggerWindowClose();
    }

    _onPressAddDish() {
        this.setState({
            isDishAdded: true
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            isRecommendDishOpen: newProps.isRecommendDishOpen
        })
    }

    _formatMenuDishes() {
        let formattedMenuDishes = [];

        this.props.locationDetails.menu.forEach(dish => {
            formattedMenuDishes.push(dish.name);
        });

        return formattedMenuDishes;
    }

    _formatMenuCategories() {
        let formattedMenuCategories = [];

        this.props.locationDetails.menu.forEach(dish => {
            formattedMenuCategories.push(dish.category);
        });

        let uniqueValuesMenuCategories = formattedMenuCategories.filter((item, pos) => {
            return formattedMenuCategories.indexOf(item) === pos;
        });

        return uniqueValuesMenuCategories;
    }
}

const mapStateToProps = (state) => ({
    locationDetails: state.locations.locationDetails,
    data: state.locations.data,
});

export default connect(mapStateToProps, { fetchLocationById, addDishInMenu })(LocationDetailsAddDish);