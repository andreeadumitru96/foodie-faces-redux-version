import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './GoogleSearchFood.css'
// import LoadingIndicator from '../../../shared/LoadingIndicator/LoadingIndicator'

class GoogleSearchFood extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
        const googleSearchFood = this.props.googleSearchedFood ? [...this.props.googleSearchedFood] : [];
        console.log(googleSearchFood);
		return (
			<div className="google-search-food__wrapper">
				{/* <LoadingIndicator isActive = {this.props.isLoadingActive}/> */}

				<div className="google-search-food__dropzone">
					<Dropzone
						multiple={false}
						accept="image/*"
						onDrop={this.props.onImageDrop}>
						<p className="drop-image-text">Drop an image or click to select a file to upload.</p>
					</Dropzone>
				</div>

				<div className="google-search-food__list-container">
					<div>
						<h1>Here are your latest google searches...</h1>
					</div>

								
					<div className="">
						{this.props.googleSearchedFood ?
							<div className="google-search-food__items-wrapper">
								{googleSearchFood.slice(Math.max(googleSearchFood.length - 5, 0)).map((search) => {
									return (
										<div className="google-search-food__list-item" key={search.urlResult}>
											<a href={search.urlResult} target="_blank"><img src={search.uploadedImgUrl} alt="" /></a>
										</div>

									)
								})}
							</div>
							:
							null
						}


					</div>
				</div>
			
			</div>
		);
	}
}

export default GoogleSearchFood;