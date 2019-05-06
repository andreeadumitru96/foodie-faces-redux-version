import * as defaultImage from '../../assets/location-default-image.jpg';

//Actions
const FETCH_CITIES = 'FETCH_CITIES';
const FETCH_LOCATIONS_BY_CITY = 'FETCH_LOCATIONS_BY_CITY';
const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
const FETCH_MOST_RATED_LOCATIONS = 'FETCH_MOST_RATED_LOCATIONS';
const FETCH_LOCATION_BY_ID = 'FETCH_LOCATION_BY_ID';
const SAVE_LOCATION_WISH_LIST = 'SAVE_LOCATION_WISH_LIST';
const FETCH_SIMILAR_LOCATIONS = 'FETCH_SIMILAR_LOCATIONS';
const FETCH_WISHLIST_LOCATIONS = 'FETCH_WISHLIST_LOCATIONS';
const REMOVE_LOCATION_WISH_LIST = 'REMOVE_LOCATION_WISH_LIST';
const ADD_MENU_DISH = 'ADD_MENU_DISH';
const ADD_LOCATION_REVIEW = 'ADD_LOCATION_REVIEW';
const RECOMMEND_LOCATION_DISH = 'RECOMMEND_LOCATION_DISH'

const initialState = {
  citiesList: [],
  locationsList: [],
  selectedCity: null,
  locationDetails: null,
  userDetails: null,
  similarLocations: [],
  wishListLocations: [],

};


//Reducer
export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES:
          return {
              ...state,
              citiesList: action.payload
          };
        case FETCH_LOCATIONS_BY_CITY:
          return {
              ...state,
              locationsList: action.payload
          };
        case SET_SELECTED_CITY: 
          return {
              ...state,
              selectedCity: action.payload
          };
        case FETCH_MOST_RATED_LOCATIONS: 
          return {
            ...state,
            locationsList: action.payload
          };
        case FETCH_LOCATION_BY_ID:
          return {
              ...state,
              locationDetails: action.payload
          };
        case SAVE_LOCATION_WISH_LIST: 
          return {
              ...state, 
              userDetails: action.payload
          };
        case FETCH_SIMILAR_LOCATIONS: 
          return {
              ...state,
              similarLocations: action.payload
          };
        case FETCH_WISHLIST_LOCATIONS: 
          return {
              ...state,
              wishListLocations: action.payload
          };
        case REMOVE_LOCATION_WISH_LIST: 
            return {
                ...state,
                userDetails: action.payload
            };  
        case ADD_MENU_DISH: 
            return {
                ...state,
                
            }; 
        case ADD_LOCATION_REVIEW: 
            return {
                ...state,
                locationDetails: action.payload
            };
        case RECOMMEND_LOCATION_DISH: 
            return {
                ...state,
                locationDetails: action.payload
            } 
        default:
          return state;
    }
}


//Action Creators

export const fetchCities = function() {
    return function(dispatch) { 
        fetch('http://localhost:3001/api/location/getLocationsCities', {
            headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((cities) => {
                    dispatch({
                        type: FETCH_CITIES,
                        payload: cities
                      })
                })
            } else {
                response.json().then(() => {
                    console.log('Error while trying to fetch cities');
                });
            }
        });
    }
} 

export const fetchLocationsByCity = function() {
    return (dispatch, getState) => {
        const selectedCity = getState().locations.selectedCity;
        fetch('http://localhost:3001/api/location/getLocationsByCity', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(selectedCity)
            }).then(function(response) {
                if(response.status === 200) {
                    response.json().then((locations) => {
                        let locationsListByCity = [];
                        locationsListByCity = setDefaultProperties(locations);
                        dispatch({
                            type: FETCH_LOCATIONS_BY_CITY,
                            payload: locationsListByCity
                        });
                    })
                }
        });
    }
}

export const setSelectedCity = (cityData) => {
    return (dispatch) => {
        dispatch({
            type: SET_SELECTED_CITY,
            payload: cityData
        })
    }
}

const setDefaultProperties = (locationsListByCity) => {
    let formattedLocationsList = []
    formattedLocationsList = locationsListByCity.map((location) => {
        if(!location.images[0]) {
            location.images[0] = defaultImage
        }
        return location;
        
    });      
    return formattedLocationsList;
}

export const fetchMostRatedLocations = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/api/location/getMostRatedLocations', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((mostRatedLocationsList) => {
                    let mostRatedLocationsListFormatted = [];
                    mostRatedLocationsListFormatted = setDefaultProperties(mostRatedLocationsList);
                  dispatch({
                    type: FETCH_MOST_RATED_LOCATIONS,
                    payload: mostRatedLocationsListFormatted
                  });
                });
            }
        });
    }
}

export const fetchLocationById = (id) => {
   
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/api/location/getSingleLocation/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'get',
            }).then(function(response){
                if(response.status === 200) {
                    response.json().then((location) => {
                        dispatch({
                            type: FETCH_LOCATION_BY_ID,
                            payload: location
                        });
                    });
                }
            });
        });
    }
}


export const getLocationById = (locationId, locationsType) => {
    return(dispatch, getState) => {

        let locationsList;
        if(locationsType === "SimilarLocationsComponent") {
            locationsList = getState().locations.similarLocations;
        } else {
            locationsList = getState().locations.locationsList;
        }

        let locationItemById = locationsList.find(location => location._id === locationId);
        return locationItemById;
    }
}

export const saveLocationToWishList = (data) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/saveLocationWishList', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
            }).then((response) => {
                if(response.status === 200) {
                    console.log(response);
                    response.json().then((userDetails) => {
                        dispatch({
                            type: SAVE_LOCATION_WISH_LIST,
                            payload: userDetails
                        });
                        resolve();
                    });
                }
            });
        });
    }
}

export const removeLocationFromWishList = (locationToRemove) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/removeLocationWishList', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(locationToRemove)
            }).then((response) => {
                if(response.status === 200) {
                    response.json().then((userDetails) => {
                        dispatch({
                            type: REMOVE_LOCATION_WISH_LIST,
                            payload: userDetails
                        });
                        
                                      
                    });
                    resolve();
                } else {
                    response.json().then((err) => {
                        // notificationError(err);
                    });
                    reject();
                }
            });
        });
    }
}


export const fetchSimilarLocations = (locationInfo, locationId) => {

    return (dispatch) => {
        fetch(`http://localhost:3001/api/location/getSimilarLocations`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'post',
            body: JSON.stringify(locationInfo),
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then((similarLocations) => {
                    similarLocations.forEach((location, index) => {
                        if(location._id === locationId) {
                            similarLocations.splice(index, 1);
                        }
                    });
                    dispatch({
                        type: FETCH_SIMILAR_LOCATIONS,
                        payload: similarLocations
                    });
                });
            }
        });
    }
}

export const fetchWishListLocations = (userId) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/api/getLocationsWishList/${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(function (response) {
            if(response.status === 200) {
                response.json().then((wishListLocations) => {
                   dispatch({
                    type: 'FETCH_WISHLIST_LOCATIONS',
                    payload: wishListLocations
                   });
                    
                });
            } else {
                response.json().then((data) => {

                });
                
            }
        });   
    }
}


export const addDishInMenu = (newDish) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/location/addDish', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(newDish),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                       
                    });
                    resolve();
                } else {
                    response.json().then(() => {

                    });
                    reject();
                }
            });
        });

    }
}

export const addLocationReview = (reviewDetails) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/location/addReview', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                method: 'post',
                body: JSON.stringify(reviewDetails)
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((location) => {
                        dispatch({
                            type: 'ADD_LOCATION_REVIEW',
                            payload: location
                        });
                    
                    });
                    resolve();
                } else {
                    response.json().then((error) => {

                    });
                    reject();
                }
            });
        });
    }
}

export const recommendLocationDish = (menuDish) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/api/location/recommendDish`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(menuDish),
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((menuDishes) => {
                        console.log(menuDishes);
                    })
                } else {
                    response.json().then((error) => {
                        // notificationError(error.message);
                    })
                }
            });
        });
    }
}

// fetch(`http://localhost:3001/api/location/getRecommendedDishes/${id}`, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },

//             method: 'get'
//         }).then(function (response) {
//             if (response.status === 200) {
//                 response.json().then((dishes) => {
//                     this.setState({
//                         mostRecommendedDishes: dishes
//                     });
//                 })
//             } else {
//                 response.json().then((error) => {
//                     notificationError(error.message);
//                 })
//             }
//         }.bind(this));


