    
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleSearchFood from './GoogleSearchFood/GoogleSearchFood';
// import { HeaderContainer } from '../HeaderContainer/HeaderContainer'
import {CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL, cookies, successNotification, notificationError} from '../../shared/constants';
import { saveGoogleSearchFood, setUSerDetailsFromCookies } from '../../../reducers/userReducer/index';
import HeaderContainer from '../HeaderContainer/HeaderContainer';


class GoogleSearchFoodContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFileCloudinaryUrl: '',
			uploadedFile: '',
			// googleSearchedFood: cookies.get('user').googleSearchedFood,
			isLoadingActive: false		
		}
		this._onImageDrop = this._onImageDrop.bind(this);
		this._handleImageUpload = this._handleImageUpload.bind(this);
		this._saveGoogleSearch = this._saveGoogleSearch.bind(this);
	}

	render() {
        console.log(this.props.userDetails);
		return (
			<div>
				<HeaderContainer
					isGoogleSearchMount={true}
				/>
				<GoogleSearchFood
					onImageDrop = {this._onImageDrop}
					googleSearchedFood = {this.props.userDetails.googleSearchedFood} 
					isLoadingActive = {this.state.isLoadingActive}
				/>
			</div>
		);
	}

	_onImageDrop(files) {
		this.setState({
			uploadedFile: files[0],
			isLoadingActive: true
		})
		this._handleImageUpload(files[0]);
	}

	_handleImageUpload(file) {

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
				let googleUrl = `http://images.google.com/searchbyimage?image_url=${image.secure_url}`

				window.open(googleUrl, '_blank');
				this._saveGoogleSearch(image.secure_url, googleUrl);
			})
		  });
	  }

	_saveGoogleSearch(imageUrl, urlResult) {
		let googleSearchData = {
			uploadedImgUrl: imageUrl,
			urlResult: urlResult,
			userId: cookies.get('user')._id
        }
        
        
        this.props.saveGoogleSearchFood(googleSearchData).then(() => {
            cookies.set('user', this.props.userDetails);                        
            this.setState({
                // googleSearchedFood: this.props.userDetails.googleSearchedFood,
                isLoadingActive: false
            });
            successNotification('Google Search entry has been saved.');
        }).catch(() => {
            notificationError('Some error occurred while trying to save the Google Searched entry...');
        });
    }

    // componentWillReceiveProps(newProps) {
    //     console.log(newProps);
    // }

    componentDidMount() { 
        if(Object.keys(this.props.userDetails).length === 0) {
            const userDetails = cookies.get('user');
            this.props.setUSerDetailsFromCookies(userDetails)
        }
    }
    
    // componentWillReceiveProps() {
    //     if(newProps.userDetails) {

    //     }
    // }
}


const mapStateToProps = (state) => ({
    userDetails: state.users.userDetails
});

export default connect(mapStateToProps, { saveGoogleSearchFood, setUSerDetailsFromCookies })(GoogleSearchFoodContainer);